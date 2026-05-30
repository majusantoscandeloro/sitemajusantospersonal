# Prompt para a IA do app Flutter (Majunity GO)

> Cole este prompt na sua IA que mexe no app. Ele explica **exatamente** o que mudou no site e no Firebase, **sem quebrar** o que já existe no app.

---

## Contexto

Você é desenvolvedor sênior Flutter trabalhando no app **Majunity GO / OnFit** (Firebase, projeto `apponfit`).

Antes, o fluxo era: a Maju criava manualmente um programa no app (em `site_templates/{algumId}`), adicionava exercícios e os alunos acessavam pelo ID do produto.

**O que mudou no ecossistema:**

1. O **site** (React) lista 16 programas com `productId` em snake_case (`definicao_total`, `hipertrofia_feminina`, etc.).
2. Aluno compra no site. O backend Mercado Pago grava no Firestore:
   - `users/{uid}` → resumo do último pagamento (`paid`, `productId`, `lastPaymentId`, `expiresAt`).
   - `purchases/{paymentId}` → **uma compra por documento** (`uid`, `productId`, `status`, `expiresAt`, `email`).
3. Foi populada a coleção **`site_templates/{productId}`** com os 16 programas (mesma estrutura que você já usava: `rotinas/{rotinaId}/exercicios/{exercicioId}`), só que agora o **ID do documento é o `productId` em snake_case** — não um UUID aleatório.
4. As capas estão no **Firebase Storage** em `programs/{productId}/cover.png` e o campo `coverImage` no documento já guarda a URL pública.

**Importante:** múltiplos programas por aluno agora são possíveis (a aluna pode comprar Definição Total + Hipertrofia + HIIT e ter acesso aos 3 ao mesmo tempo).

---

## Objetivo da tarefa

Adaptar o app para:

1. Listar para o aluno **todos os programas que ele comprou** (não só o último).
2. Ler de `site_templates/{productId}` (mesma estrutura de antes — não precisa mudar a UI dos exercícios).
3. Continuar permitindo que a Maju crie/edite programas e exercícios manualmente (`majuscandeloro@outlook.com` ou `*@majunity.com`), porque as regras já permitem.

Você **não deve** mexer em:
- Telas/coleções de personal (`usuarios_personal`, `alunos`, `treinos_realizados`, `feedbacks_treino`, `parceiros`, etc.).
- Fluxo do **personal trainer** (continua igual).
- Estrutura interna de `rotinas` e `exercicios` dentro de cada template.

---

## Estrutura oficial no Firestore

### 1. Compras do aluno

Coleção `purchases/{paymentId}` — fonte de verdade do que cada aluno comprou:

```jsonc
{
  "paymentId": "160522046876",
  "uid": "firebase-uid-do-aluno",
  "email": "cliente@email.com",
  "productId": "definicao_total",     // ID do template a liberar
  "status": "approved",
  "durationDays": 90,
  "createdAt": <Timestamp>,
  "expiresAt": <Timestamp>
}
```

Coleção `users/{uid}` (resumo da última compra; útil para acesso rápido):

```jsonc
{
  "paid": true,
  "productId": "definicao_total",
  "latestProductId": "definicao_total",
  "lastPaymentId": "160522046876",
  "expiresAt": <Timestamp>
}
```

> **Use `purchases` quando o aluno tiver mais de uma compra.** Use `users/{uid}` só como fallback rápido se precisar.

### 2. Catálogo dos programas (já criado pelo seed)

```
site_templates/{productId}                   // ex: site_templates/definicao_total
  ├── productId: "definicao_total"
  ├── siteId: "1"
  ├── title: "Definição Total"
  ├── subtitle: null | string
  ├── description: string
  ├── level: "Iniciante" | "Intermediário" | "Avançado"
  ├── durationLabel: "8 a 12 semanas"
  ├── durationWeeks: 12
  ├── priceCents: 100
  ├── category: string | null
  ├── type: "programa" | "consultoria"
  ├── tags: ["definição", "emagrecimento"]
  ├── coverImage: "https://storage.googleapis.com/apponfit.firebasestorage.app/programs/definicao_total/cover.png"
  ├── accessDays: 90
  ├── published: true
  ├── rotinasCount: number
  │
  └── rotinas/{rotinaId}
        ├── number: 1
        ├── title: "Rotina 1 — Adaptação"
        ├── description: string
        ├── day: "A" | "B" | "C" | ...
        ├── focus: string
        ├── estimatedMinutes: number
        ├── order: number
        ├── productId: string
        │
        └── exercicios/{exercicioId}
              ├── order: 1
              ├── name: "Aquecimento"
              ├── sets: number
              ├── reps: string
              ├── restSeconds: number
              ├── videoUrl: string | null
              └── notes: string | null
```

### 3. Lista oficial de `productId`

| productId | Título |
|-----------|--------|
| definicao_total | Definição Total |
| hipertrofia_feminina_quadriceps | Hipertrofia Feminina (Quadríceps) |
| hipertrofia_feminina | Hipertrofia Feminina (Glúteos) |
| hipertrofia_feminina_superiores | Hipertrofia Feminina (Superiores) |
| treino_em_casa_express | Treino em Casa Express |
| start_inicial | Start Inicial |
| lipedema | Lipedema |
| em_casa_sem_equipamento | Em Casa Sem Equipamento |
| abdominal_slim | Abdominal Slim |
| definicao_feminina | Definição Feminina |
| casa_completo | Casa Completo |
| treino_de_20_minutos | Treino de 20 Minutos |
| hiit_sem_equipamento | HIIT Sem Equipamento |
| alongamento_e_flexibilidade | Alongamento e Flexibilidade |
| desafio_21_dias | Desafio 21 dias |
| desafio_30_dias | Desafio 30 dias |
| consultoria_mensal | Acompanhamento Mensal |
| consultoria_trimestral | Acompanhamento Trimestral |

---

## Regras do Firestore (já publicadas em produção)

As regras relevantes para o app são:

```
match /users/{uid} {
  allow read: if request.auth != null && request.auth.uid == uid;
  // aluno NÃO pode editar paid/productId/expiresAt (só backend)
}

match /purchases/{paymentId} {
  allow read, write: if false;       // ⚠ APP NÃO LÊ AQUI
}

match /site_templates/{programaId} {
  allow read: if request.auth != null;
  // escrita só para majuscandeloro@outlook.com ou *@majunity.com
  match /rotinas/{rotinaId} { allow read: if request.auth != null; ... }
  match /rotinas/{rotinaId}/exercicios/{exId} { allow read: if request.auth != null; ... }
}
```

### ⚠ Decisão importante de arquitetura

O app **não consegue** ler `purchases/{paymentId}` (regra bloqueia).
**Você tem duas opções:**

#### Opção A (mais simples e segura — RECOMENDADA)
Pedir para o **backend** (já tem Admin SDK rodando em mp-backend-r1ec.onrender.com) **espelhar** as compras em um lugar que o app pode ler:

- Quando uma compra é aprovada, o backend também escreve em `users/{uid}/myPrograms/{productId}` com `{ productId, expiresAt, status, paymentId }`.
- App lê `users/{uid}/myPrograms` (que cai dentro da regra `users/{uid}` que o aluno tem acesso de leitura).

**Pedido para o backend:** "no webhook do MP, ao confirmar pagamento, faça um `set` adicional em `users/{uid}/myPrograms/{productId}` com `{ productId, expiresAt, status: 'approved', paymentId, createdAt }`. Isso permite o app listar todos os programas comprados pelo aluno sem expor a coleção `purchases`."

#### Opção B (mais rápida — só último programa)
Continuar usando só `users/{uid}.productId`. Limitação: aluno vê só o **último** programa que comprou no app, mesmo que tenha comprado vários.

#### Opção C (alterar regras)
Soltar leitura de `purchases` por `uid` próprio. Adicionar:

```
match /purchases/{paymentId} {
  allow read: if request.auth != null && resource.data.uid == request.auth.uid;
  allow write: if false;
}
```

Aí o app pode ler diretamente — funciona, mas expõe mais a coleção.

**Implemente a Opção A se possível. Se for difícil mexer no backend, use C como plano B.**

---

## Código Dart para implementar

### 1. Model `MyProgram`

```dart
// lib/models/my_program.dart
import 'package:cloud_firestore/cloud_firestore.dart';

class MyProgram {
  final String productId;
  final String? status;
  final DateTime? expiresAt;
  final String? paymentId;

  MyProgram({
    required this.productId,
    this.status,
    this.expiresAt,
    this.paymentId,
  });

  bool get isActive {
    final approved = (status ?? '').toLowerCase() == 'approved';
    final notExpired = expiresAt == null || expiresAt!.isAfter(DateTime.now());
    return approved && notExpired;
  }

  factory MyProgram.fromDoc(DocumentSnapshot<Map<String, dynamic>> doc) {
    final d = doc.data() ?? {};
    return MyProgram(
      productId: d['productId'] as String? ?? doc.id,
      status: d['status'] as String?,
      expiresAt: (d['expiresAt'] as Timestamp?)?.toDate(),
      paymentId: d['paymentId'] as String?,
    );
  }
}
```

### 2. Serviço — Opção A (recomendada, lê `users/{uid}/myPrograms`)

```dart
// lib/services/my_programs_service.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import '../models/my_program.dart';

class MyProgramsService {
  final _db = FirebaseFirestore.instance;

  Stream<List<MyProgram>> watchMyPrograms() {
    final uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) return const Stream.empty();

    return _db
        .collection('users')
        .doc(uid)
        .collection('myPrograms')
        .snapshots()
        .map((snap) => snap.docs
            .map(MyProgram.fromDoc)
            .where((p) => p.isActive)
            .toList());
  }

  /// Fallback (Opção B): usa só users/{uid}.productId
  Stream<List<MyProgram>> watchLastProgramFallback() {
    final uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) return const Stream.empty();

    return _db.collection('users').doc(uid).snapshots().map((snap) {
      final d = snap.data();
      if (d == null || d['paid'] != true) return <MyProgram>[];
      final productId = d['productId'] as String?;
      if (productId == null) return <MyProgram>[];
      return [
        MyProgram(
          productId: productId,
          status: 'approved',
          expiresAt: (d['expiresAt'] as Timestamp?)?.toDate(),
          paymentId: d['lastPaymentId'] as String?,
        ),
      ];
    });
  }
}
```

### 3. Tela "Meus Programas" (usa o que o aluno tem acesso)

```dart
// lib/screens/aluno/my_programs_screen.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../../models/my_program.dart';
import '../../services/my_programs_service.dart';
import 'program_detail_screen.dart';

class MyProgramsScreen extends StatelessWidget {
  const MyProgramsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final service = MyProgramsService();

    return Scaffold(
      appBar: AppBar(title: const Text('Meus Programas')),
      body: StreamBuilder<List<MyProgram>>(
        stream: service.watchMyPrograms(),
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          final list = snap.data ?? [];
          if (list.isEmpty) {
            return const _EmptyState();
          }

          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: list.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (_, i) => _ProgramTile(myProgram: list[i]),
          );
        },
      ),
    );
  }
}

class _ProgramTile extends StatelessWidget {
  final MyProgram myProgram;
  const _ProgramTile({required this.myProgram});

  @override
  Widget build(BuildContext context) {
    final ref =
        FirebaseFirestore.instance.collection('site_templates').doc(myProgram.productId);

    return FutureBuilder<DocumentSnapshot<Map<String, dynamic>>>(
      future: ref.get(),
      builder: (context, snap) {
        final d = snap.data?.data();
        final title = d?['title'] as String? ?? myProgram.productId;
        final subtitle = d?['subtitle'] as String?;
        final image = d?['coverImage'] as String?;
        final level = d?['level'] as String?;

        return Card(
          clipBehavior: Clip.antiAlias,
          child: InkWell(
            onTap: () => Navigator.of(context).push(
              MaterialPageRoute(
                builder: (_) => ProgramDetailScreen(productId: myProgram.productId),
              ),
            ),
            child: Row(
              children: [
                if (image != null)
                  Image.network(image, width: 100, height: 100, fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => _placeholder())
                else
                  _placeholder(),
                const SizedBox(width: 12),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(title, style: Theme.of(context).textTheme.titleMedium),
                        if (subtitle != null)
                          Text(subtitle, style: Theme.of(context).textTheme.bodySmall),
                        if (level != null)
                          Text('Nível: $level',
                              style: Theme.of(context).textTheme.bodySmall),
                        if (myProgram.expiresAt != null)
                          Text(
                            'Acesso até ${_fmt(myProgram.expiresAt!)}',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                      ],
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.only(right: 12),
                  child: Icon(Icons.chevron_right),
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _placeholder() => Container(width: 100, height: 100, color: Colors.grey.shade300);
  String _fmt(DateTime d) =>
      '${d.day.toString().padLeft(2, '0')}/${d.month.toString().padLeft(2, '0')}/${d.year}';
}

class _EmptyState extends StatelessWidget {
  const _EmptyState();
  @override
  Widget build(BuildContext context) => const Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.shopping_bag_outlined, size: 56),
              SizedBox(height: 12),
              Text('Você ainda não tem programas ativos.', textAlign: TextAlign.center),
              SizedBox(height: 8),
              Text('Compre um programa no site para liberar aqui.', textAlign: TextAlign.center),
            ],
          ),
        ),
      );
}
```

### 4. Tela de detalhe do programa (lê `site_templates/{productId}`)

```dart
// lib/screens/aluno/program_detail_screen.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class ProgramDetailScreen extends StatelessWidget {
  final String productId;
  const ProgramDetailScreen({super.key, required this.productId});

  @override
  Widget build(BuildContext context) {
    final templateRef =
        FirebaseFirestore.instance.collection('site_templates').doc(productId);

    return Scaffold(
      appBar: AppBar(title: const Text('Programa')),
      body: FutureBuilder<DocumentSnapshot<Map<String, dynamic>>>(
        future: templateRef.get(),
        builder: (context, snap) {
          if (!snap.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          final data = snap.data!.data();
          if (data == null) return const Center(child: Text('Programa não encontrado.'));

          return StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
            stream: templateRef.collection('rotinas').orderBy('order').snapshots(),
            builder: (context, rs) {
              final rotinas = rs.data?.docs ?? [];
              return ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  if (data['coverImage'] is String)
                    AspectRatio(
                      aspectRatio: 16 / 9,
                      child: Image.network(data['coverImage'] as String, fit: BoxFit.cover),
                    ),
                  const SizedBox(height: 12),
                  Text(data['title'] as String? ?? productId,
                      style: Theme.of(context).textTheme.headlineSmall),
                  if (data['description'] is String) ...[
                    const SizedBox(height: 8),
                    Text(data['description'] as String),
                  ],
                  const SizedBox(height: 16),
                  ...rotinas.map((r) {
                    final rd = r.data();
                    return ExpansionTile(
                      title: Text(rd['title'] as String? ?? 'Rotina'),
                      subtitle: rd['focus'] is String ? Text(rd['focus'] as String) : null,
                      children: [
                        StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
                          stream: r.reference
                              .collection('exercicios')
                              .orderBy('order')
                              .snapshots(),
                          builder: (context, es) {
                            final ex = es.data?.docs ?? [];
                            return Column(
                              children: ex.map((doc) {
                                final e = doc.data();
                                return ListTile(
                                  leading: e['videoUrl'] is String
                                      ? const Icon(Icons.play_circle_outline)
                                      : const Icon(Icons.fitness_center),
                                  title: Text(e['name'] as String? ?? ''),
                                  subtitle: Text(
                                    '${e['sets'] ?? 0} séries × ${e['reps'] ?? '-'}'
                                    '${e['restSeconds'] != null ? ' • ${e['restSeconds']}s desc.' : ''}',
                                  ),
                                  onTap: e['videoUrl'] is String
                                      ? () { /* abre player */ }
                                      : null,
                                );
                              }).toList(),
                            );
                          },
                        ),
                      ],
                    );
                  }),
                ],
              );
            },
          );
        },
      ),
    );
  }
}
```

### 5. Helper para checar acesso (uso em qualquer tela)

```dart
// uso: if (await UserAccess.has('definicao_total')) { ... }
class UserAccess {
  static Future<bool> has(String productId) async {
    final uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) return false;
    final ref = FirebaseFirestore.instance
        .collection('users')
        .doc(uid)
        .collection('myPrograms')
        .doc(productId);
    final snap = await ref.get();
    final d = snap.data();
    if (d == null) return false;
    final expires = (d['expiresAt'] as Timestamp?)?.toDate();
    final notExpired = expires == null || expires.isAfter(DateTime.now());
    return notExpired && (d['status'] ?? 'approved') == 'approved';
  }
}
```

---

## Checklist de implementação

- [ ] Decidir entre **Opção A** (backend espelha em `users/{uid}/myPrograms`) ou **Opção C** (regras permitem leitura de `purchases`).
- [ ] Se Opção A: pedir o ajuste ao backend (Render). Se Opção C: atualizar `firestore.rules` e publicar.
- [ ] Criar `lib/models/my_program.dart`.
- [ ] Criar `lib/services/my_programs_service.dart`.
- [ ] Criar tela `MyProgramsScreen` (substitui o que hoje lista o último programa).
- [ ] Criar/ajustar `ProgramDetailScreen` para ler de `site_templates/{productId}`.
- [ ] Testar com a aluna fictícia que tem **2 programas comprados** (verificar se aparecem os dois cards).
- [ ] Verificar se o admin (`majuscandeloro@outlook.com`) ainda consegue editar rotinas/exercícios — a estrutura é a mesma de antes, só mudou o ID do documento que agora é o `productId`.

---

## O que **não** muda no app

- Tela de criação/edição de programa pela Maju → continua funcionando, só salva em `site_templates/{productId}` em vez de UUID.
- Personal → não foi tocado.
- Treinos do personal (`treinos_realizados`, `feedbacks_treino`, `biblioteca_treinos`) → não foi tocado.
- PAR-Q, anamnese, pré-cadastros → não foi tocado.

---

## Pergunta final que você deve responder ao usuário

Depois de implementar, retorne:

1. Qual opção foi escolhida (A, B ou C).
2. Quais arquivos foram criados/alterados.
3. Como testar (passo a passo).
4. Se for Opção A, o pedido pronto para colar no backend (Render).
