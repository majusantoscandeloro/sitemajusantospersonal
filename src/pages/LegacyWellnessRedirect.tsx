import { Navigate, useLocation } from 'react-router-dom';
import { WELLNESS_INSCRICAO_PATH, WELLNESS_PATH } from '@/data/wellnessExperience';

/** Redireciona /wellnessexperience (e #inscricao) para as novas rotas amigáveis. */
const LegacyWellnessRedirect = () => {
  const { hash } = useLocation();
  const to = hash === '#inscricao' ? WELLNESS_INSCRICAO_PATH : WELLNESS_PATH;
  return <Navigate to={to} replace />;
};

export default LegacyWellnessRedirect;
