import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  WELLNESS_EVENT,
  WELLNESS_PATH,
  WELLNESS_REGISTRATION_OPEN,
} from '@/data/wellnessExperience';
import teamMajuFlyer from '@/assets/imagens_site/team_maju.webp';

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
            <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
              <img
                src={teamMajuFlyer}
                alt="Wellness Experience — Team Maju"
                className={`h-full w-full object-cover ${!WELLNESS_REGISTRATION_OPEN ? 'opacity-80' : ''}`}
              />
              {!WELLNESS_REGISTRATION_OPEN && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                  <span className="rounded-full bg-background/95 px-5 py-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                    Evento finalizado
                  </span>
                </div>
              )}
            </div>
            <div className="p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                {WELLNESS_REGISTRATION_OPEN ? 'Em breve · Marília' : 'Finalizado · Marília'}
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                Wellness Experience
              </h2>
              <p className="mt-3 text-muted-foreground">
                {WELLNESS_REGISTRATION_OPEN
                  ? 'Uma manhã completa com treino funcional, café da manhã, momento de aprendizado e sorteios especiais.'
                  : 'Este encontro já aconteceu. Obrigada a quem esteve com a Team Maju — em breve divulgamos os próximos eventos.'}
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" />
                  {WELLNESS_EVENT.date} · {WELLNESS_EVENT.time}
                </span>
                <span className="inline-flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>
                    {WELLNESS_EVENT.location} ({WELLNESS_EVENT.locationSubtitle})
                    <br />
                    {WELLNESS_EVENT.address} — {WELLNESS_EVENT.city}
                  </span>
                </span>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {WELLNESS_REGISTRATION_OPEN ? (
                  <>
                    <Button asChild size="lg" className="min-h-[48px] flex-1">
                      <Link to={WELLNESS_PATH}>
                        Ver detalhes e inscrição
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </>
                ) : (
                  <Button asChild variant="outline" size="lg" className="min-h-[48px] flex-1">
                    <Link to={WELLNESS_PATH}>Ver detalhes do evento</Link>
                  </Button>
                )}
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
