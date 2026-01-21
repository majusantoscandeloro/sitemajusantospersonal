import AnimatedSection from './AnimatedSection';

const ContextSection = () => {
  const items = [
    {
      title: 'Para quem está começando',
      description: 'Treinos estruturados para criar o hábito e ganhar confiança.',
    },
    {
      title: 'Para quem tem pouco tempo',
      description: 'Rotinas eficientes que cabem na sua agenda.',
    },
    {
      title: 'Para quem busca resultados',
      description: 'Programas focados em transformação real.',
    },
  ];

  return (
    <section id="para-quem" className="py-20 md:py-32" aria-labelledby="para-quem-title">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fade-in">
            <h2 id="para-quem-title" className="font-display text-3xl md:text-5xl font-bold mb-8">
              O treino certo para a{' '}
              <span className="text-gradient">sua rotina</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in" delay={200}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-12">
              Aqui você encontra o treino certo para a sua rotina e seus objetivos.
              Programas pensados para diferentes níveis, com foco em constância e resultados reais.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item, index) => (
              <AnimatedSection 
                key={index}
                animation="scale-in" 
                delay={index * 100}
              >
                <article className="p-6 bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background">
                  <h3 className="font-display text-xl font-semibold mb-3 text-primary">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    {item.description}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContextSection;
