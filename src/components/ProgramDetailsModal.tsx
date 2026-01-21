import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Clock, CheckCircle2 } from 'lucide-react';
import { ProgramDetails } from '@/data/programDetails';
import WhatsAppIcon from './icons/WhatsApp';

interface ProgramDetailsModalProps {
  program: ProgramDetails | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProgramDetailsModal = ({ program, open, onOpenChange }: ProgramDetailsModalProps) => {
  if (!program) return null;

  const whatsappMessage = encodeURIComponent(
    `Olá! Tenho interesse no programa: ${program.title}`
  );
  const whatsappUrl = `https://wa.me/5514996536032?text=${whatsappMessage}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl md:text-3xl font-bold">
            {program.title}
          </DialogTitle>
          <DialogDescription className="text-base text-foreground/70 pt-2 leading-relaxed">
            {program.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Features */}
          {program.features && program.features.length > 0 && (
            <div>
              <h4 className="font-semibold text-lg mb-3">O que está incluído:</h4>
              <ul className="space-y-2">
                {program.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Price */}
          <div className="bg-card/50 rounded-lg p-6 border border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground/60 mb-2 uppercase tracking-wide">Investimento</p>
                <p className="text-3xl font-bold text-primary">{program.price}</p>
                <p className="text-xs text-foreground/50 mt-1">Consultoria Online {program.title.includes('Mensal') ? 'Mensal' : 'Trimestral'}</p>
              </div>
              <Clock className="w-10 h-10 text-primary/50" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            >
              <WhatsAppIcon size={20} className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProgramDetailsModal;
