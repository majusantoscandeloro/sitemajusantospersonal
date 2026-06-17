import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  WELLNESS_EVENT,
  WELLNESS_INSCRICAO_PATH,
  WELLNESS_PATH,
} from '@/data/wellnessExperience';
import teamMajuFlyer from '@/assets/imagens_site/team_maju.png';

const Eventos = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pb-20 pt-28 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-primary" />
          <h1 className="font-display text-4xl font-bold md:text-5xl">Eventos</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Encontros presenciais da Team Maju para movimento, conexão e bem-estar.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
            <div className="aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
              <img
                src={teamMajuFlyer}
                alt="Wellness Experience — Team Maju"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Em breve · Marília
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Wellness Experience
              </h2>
              <p className="mt-3 text-muted-foreground">
                Uma manhã completa com treino funcional, café da manhã, momento de aprendizado e
                sorteios especiais.
              </p>

              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  {WELLNESS_EVENT.date} · {WELLNESS_EVENT.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {WELLNESS_EVENT.location}, {WELLNESS_EVENT.city}
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="min-h-[48px] flex-1">
                  <Link to={WELLNESS_INSCRICAO_PATH}>
                    Inscrever-se
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="min-h-[48px] flex-1">
                  <Link to={WELLNESS_PATH}>Ver detalhes do evento</Link>
                </Button>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Eventos;
