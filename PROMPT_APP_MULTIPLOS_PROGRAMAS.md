# App Majunity GO – Múltiplos programas por aluno

Guia para o app Flutter liberar **vários programas** comprados pelo mesmo usuário, e modelo recomendado de Firestore para os treinos.

---

## 1. Como o site grava as compras hoje

Existem duas fontes de verdade no Firestore:

### `users/{uid}` (resumo do último pagamento)

Gravado pelo backend MP e usado para liberar acesso rápido / mostrar "última compra".

```json
{
  "paid": true,
  "productId": "definicao_total",
  "latestProductId": "definicao_total",
  "lastPaymentId": "160522046876",
  "expiresAt": "2026-08-30T14:42:11.000Z"
}
```

> ⚠️ Esse documento sempre reflete o **último** produto pago. Não use ele como única fonte para liberar múltiplos programas.

### `purchases/{paymentId}` (histórico completo, uma compra por documento)

Cada compra do Mercado Pago vira um documento. Esta é a fonte usada para liberar **todos** os programas ativos.

```json
{
  "paymentId": "160522046876",
  "uid": "firebase-uid-abc123",
  "email": "cliente@email.com",
  "productId": "hipertrofia_feminina",
  "status": "approved",
  "durationDays": 90,
  "createdAt": "2026-05-22T14:42:11.000Z",
  "expiresAt": "2026-08-20T14:42:11.000Z"
}
```

O app **deve consumir esta coleção** para liberar acesso.

---

## 2. Lista oficial de `productId`

Estes são os IDs que o backend grava em `purchases.productId`. O app deve ter, no Firestore (coleção `programs/`), um documento com **exatamente o mesmo ID** para cada programa.

### Programas de treino (16)

| `productId` | Título no site |
|-------------|----------------|
| `definicao_total` | Definição Total |
| `hipertrofia_feminina` | Hipertrofia Feminina (Glúteos) |
| `hipertrofia_feminina_quadriceps` | Hipertrofia Feminina (Quadríceps) |
| `hipertrofia_feminina_superiores` | Hipertrofia Feminina (Superiores) |
| `treino_em_casa_express` | Treino em Casa Express |
| `start_inicial` | Start Inicial |
| `lipedema` | Lipedema |
| `em_casa_sem_equipamento` | Em Casa Sem Equipamento |
| `abdominal_slim` | Abdominal Slim |
| `definicao_feminina` | Definição Feminina |
| `casa_completo` | Casa Completo |
| `treino_de_20_minutos` | Treino de 20 Minutos |
| `hiit_sem_equipamento` | HIIT Sem Equipamento |
| `alongamento_e_flexibilidade` | Alongamento e Flexibilidade |
| `desafio_21_dias` | Desafio 21 dias |
| `desafio_30_dias` | Desafio 30 dias |

### Consultorias (2) – não são programa de treino

- `consultoria_mensal`
- `consultoria_trimestral`

---

## 3. Modelo Firestore recomendado para os treinos

```
programs/{productId}                  // ex.: programs/definicao_total
  ├── title: string                   // "Definição Total"
  ├── subtitle?: string
  ├── level: "Iniciante" | "Intermediário" | "Avançado"
  ├── durationWeeks: number           // 12
  ├── coverImage: string              // URL do Firebase Storage
  ├── description: string
  ├── tags: string[]                  // ["definição","glúteos"]
  ├── totalWorkouts: number           // calculado/cache
  └── weeks/{weekNumber}              // subcoleção (semana_1, semana_2…)
        ├── number: number
        ├── title: string             // "Semana 1 - Adaptação"
        ├── description?: string
        └── workouts/{workoutId}      // subcoleção
              ├── order: number       // 1,2,3...
              ├── day: "A" | "B" | "C" | "D" | "E"
              ├── title: string       // "Treino A - Inferiores"
              ├── focus: string       // "Glúteos e posteriores"
              ├── estimatedMinutes: number
              └── exercises: [
                    {
                      name: "Agachamento livre",
                      sets: 4,
                      reps: "10-12",
                      restSeconds: 60,
                      videoUrl: "https://...",
                      notes?: "Foco na descida controlada"
                    }
                  ]
```

> Use o `productId` como ID do documento em `programs/{productId}`. Assim, dado o `productId` da compra, o app abre direto o programa correspondente.

---

## 4. Regras do Firestore (segurança)

Garanta que o aluno só leia o que comprou:

```ruby
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Perfil e dados do usuário
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    match /profiles/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Compras: aluno só lê as próprias. Apenas o backend (Admin SDK) escreve.
    match /purchases/{paymentId} {
      allow read: if request.auth != null && resource.data.uid == request.auth.uid;
      allow write: if false; // só Admin SDK do backend
    }

    // Catálogo de programas: leitura aberta pra autenticados.
    // O bloqueio do CONTEÚDO acontece no app (só mostra os comprados).
    // Se preferir bloquear leitura também, troque para a regra alternativa abaixo.
    match /programs/{productId} {
      allow read: if request.auth != null;
      allow write: if false;

      match /{document=**} {
        allow read: if request.auth != null;
        allow write: if false;
      }
    }

    // Alternativa MAIS estrita (recomendada): só lê programas que possui compra ativa.
    // match /programs/{productId} {
    //   allow read: if request.auth != null &&
    //     exists(/databases/$(database)/documents/purchases/$(request.auth.uid + "_" + productId));
    // }
  }
}
```

---

## 5. Código Flutter pronto

### 5.1 Modelo de domínio

```dart
// lib/models/user_purchase.dart
import 'package:cloud_firestore/cloud_firestore.dart';

class UserPurchase {
  final String paymentId;
  final String productId;
  final String? status;
  final DateTime? expiresAt;
  final DateTime? createdAt;

  UserPurchase({
    required this.paymentId,
    required this.productId,
    this.status,
    this.expiresAt,
    this.createdAt,
  });

  bool get isActive {
    final approved = (status ?? '').toLowerCase() == 'approved' ||
        (status ?? '').toLowerCase() == 'paid';
    final notExpired = expiresAt == null || expiresAt!.isAfter(DateTime.now());
    return approved && notExpired;
  }

  factory UserPurchase.fromDoc(DocumentSnapshot<Map<String, dynamic>> doc) {
    final data = doc.data() ?? {};
    return UserPurchase(
      paymentId: doc.id,
      productId: data['productId'] as String? ?? '',
      status: data['status'] as String?,
      expiresAt: (data['expiresAt'] as Timestamp?)?.toDate(),
      createdAt: (data['createdAt'] as Timestamp?)?.toDate(),
    );
  }
}
```

### 5.2 Serviço para listar programas comprados pelo aluno

```dart
// lib/services/purchases_service.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';

import '../models/user_purchase.dart';

class PurchasesService {
  final _db = FirebaseFirestore.instance;

  /// Stream em tempo real das compras ATIVAS do usuário logado.
  /// O app atualiza sozinho quando o aluno compra mais um programa.
  Stream<List<UserPurchase>> watchActivePurchases() {
    final uid = FirebaseAuth.instance.currentUser?.uid;
    if (uid == null) return const Stream.empty();

    return _db
        .collection('purchases')
        .where('uid', isEqualTo: uid)
        .snapshots()
        .map((snap) => snap.docs
            .map(UserPurchase.fromDoc)
            .where((p) => p.isActive && p.productId.isNotEmpty)
            .toList()
          ..sort((a, b) =>
              (b.createdAt ?? DateTime(2000)).compareTo(a.createdAt ?? DateTime(2000))));
  }

  /// Lista de productIds ativos – útil pra checar acesso em qualquer tela.
  Stream<Set<String>> watchActiveProductIds() {
    return watchActivePurchases().map(
      (purchases) => purchases.map((p) => p.productId).toSet(),
    );
  }
}
```

### 5.3 Tela "Meus Programas" (lista o que o aluno comprou)

```dart
// lib/screens/my_programs_screen.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../models/user_purchase.dart';
import '../services/purchases_service.dart';
import 'program_detail_screen.dart';

class MyProgramsScreen extends StatelessWidget {
  const MyProgramsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final service = PurchasesService();

    return Scaffold(
      appBar: AppBar(title: const Text('Meus Programas')),
      body: StreamBuilder<List<UserPurchase>>(
        stream: service.watchActivePurchases(),
        builder: (context, snap) {
          if (snap.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          final purchases = snap.data ?? [];
          if (purchases.isEmpty) {
            return const _EmptyState();
          }

          return ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: purchases.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, i) {
              final p = purchases[i];
              return _ProgramTile(
                productId: p.productId,
                expiresAt: p.expiresAt,
                onTap: () => Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (_) => ProgramDetailScreen(productId: p.productId),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

class _ProgramTile extends StatelessWidget {
  final String productId;
  final DateTime? expiresAt;
  final VoidCallback onTap;
  const _ProgramTile({
    required this.productId,
    required this.expiresAt,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<DocumentSnapshot<Map<String, dynamic>>>(
      future: FirebaseFirestore.instance
          .collection('programs')
          .doc(productId)
          .get(),
      builder: (context, snap) {
        final data = snap.data?.data();
        final title = data?['title'] as String? ?? productId;
        final image = data?['coverImage'] as String?;

        return Card(
          clipBehavior: Clip.antiAlias,
          child: InkWell(
            onTap: onTap,
            child: Row(
              children: [
                if (image != null)
                  Image.network(image, width: 100, height: 100, fit: BoxFit.cover)
                else
                  Container(width: 100, height: 100, color: Colors.grey.shade300),
                const SizedBox(width: 12),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(title, style: Theme.of(context).textTheme.titleMedium),
                        if (expiresAt != null)
                          Text(
                            'Acesso até ${expiresAt!.day.toString().padLeft(2, '0')}/${expiresAt!.month.toString().padLeft(2, '0')}/${expiresAt!.year}',
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
}

class _EmptyState extends StatelessWidget {
  const _EmptyState();

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: const [
            Icon(Icons.shopping_bag_outlined, size: 56),
            SizedBox(height: 12),
            Text(
              'Você ainda não tem programas ativos.',
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 8),
            Text(
              'Compre um programa no site para liberar o acesso aqui.',
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
```

### 5.4 Tela de detalhe do programa (carrega semanas/treinos)

```dart
// lib/screens/program_detail_screen.dart
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

class ProgramDetailScreen extends StatelessWidget {
  final String productId;
  const ProgramDetailScreen({super.key, required this.productId});

  @override
  Widget build(BuildContext context) {
    final programRef =
        FirebaseFirestore.instance.collection('programs').doc(productId);

    return Scaffold(
      appBar: AppBar(title: const Text('Programa')),
      body: FutureBuilder<DocumentSnapshot<Map<String, dynamic>>>(
        future: programRef.get(),
        builder: (context, snap) {
          if (!snap.hasData) {
            return const Center(child: CircularProgressIndicator());
          }
          final data = snap.data!.data();
          if (data == null) {
            return const Center(child: Text('Programa não encontrado.'));
          }

          return StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
            stream: programRef
                .collection('weeks')
                .orderBy('number')
                .snapshots(),
            builder: (context, weeksSnap) {
              final weeks = weeksSnap.data?.docs ?? [];
              return ListView(
                padding: const EdgeInsets.all(16),
                children: [
                  Text(
                    data['title'] as String? ?? productId,
                    style: Theme.of(context).textTheme.headlineSmall,
                  ),
                  const SizedBox(height: 8),
                  if (data['description'] is String)
                    Text(data['description'] as String),
                  const SizedBox(height: 16),
                  ...weeks.map((w) {
                    final week = w.data();
                    return ExpansionTile(
                      title: Text(week['title'] as String? ?? 'Semana'),
                      children: [
                        StreamBuilder<QuerySnapshot<Map<String, dynamic>>>(
                          stream: w.reference
                              .collection('workouts')
                              .orderBy('order')
                              .snapshots(),
                          builder: (context, ws) {
                            final workouts = ws.data?.docs ?? [];
                            return Column(
                              children: workouts.map((doc) {
                                final wk = doc.data();
                                return ListTile(
                                  title: Text(wk['title'] as String? ?? ''),
                                  subtitle: Text(wk['focus'] as String? ?? ''),
                                  trailing: Text('${wk['estimatedMinutes'] ?? 0} min'),
                                  onTap: () {
                                    // navega para tela de execução
                                  },
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

### 5.5 Verificação rápida de acesso em qualquer tela

```dart
// Exemplo: bloquear um botão se o aluno não comprou aquele programa
StreamBuilder<Set<String>>(
  stream: PurchasesService().watchActiveProductIds(),
  builder: (context, snap) {
    final owned = snap.data ?? {};
    final hasAccess = owned.contains('definicao_total');
    return ElevatedButton(
      onPressed: hasAccess ? () { /* abrir */ } : null,
      child: Text(hasAccess ? 'Abrir treino' : 'Compre para acessar'),
    );
  },
);
```

---

## 6. Como popular o catálogo `programs/`

### Script automático (recomendado)

Na raiz do site:

```bash
# 1. Salve a chave do Firebase em tools/serviceAccountKey.json (veja tools/README-seed.md)
npm install
npm run seed:programs              # 16 programas + Semana 1 / Treino A modelo
npm run seed:programs -- --dry-run # simular sem gravar
npm run seed:programs -- definicao_total start_inicial  # só alguns
```

Documentação completa: **`tools/README-seed.md`**

### Manual

No Console do Firebase, crie `programs/{productId}` com os mesmos campos do seed.

Sugestão: rode o seed, valide no app com **`definicao_total`**, depois edite semanas/treinos reais no Firestore.

---

## 7. Checklist final de integração app ↔ site

- [ ] Backend grava `purchases/{paymentId}` com `uid`, `productId`, `status: "approved"` e `expiresAt` (já implementado).
- [ ] App lê `purchases where uid == currentUser.uid` (código em `PurchasesService`).
- [ ] Para cada compra ativa, app abre `programs/{productId}` no Firestore.
- [ ] Regras de segurança publicadas no Firestore (seção 4).
- [ ] Documentos `programs/{productId}` criados para cada um dos 16 programas.

Pronto: a aluna pode comprar quantos programas quiser no site, todos aparecem no app, e cada um carrega seu próprio conteúdo de treino.
