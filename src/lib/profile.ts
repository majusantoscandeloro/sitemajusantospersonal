import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  name: string;
  whatsapp?: string;
  email: string;
  updatedAt: any; // serverTimestamp
}

/** Campos enviados ao salvar — merge no Firestore; basta nome ou WhatsApp. */
export type UserProfileInput = {
  email: string;
  name?: string;
  whatsapp?: string;
};

/**
 * Buscar perfil do usuário no Firestore
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const profileRef = doc(db, 'profiles', uid);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      return profileSnap.data() as UserProfile;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw new Error('Erro ao buscar perfil do usuário');
  }
}

/**
 * Salvar ou atualizar perfil do usuário no Firestore
 */
export async function saveUserProfile(
  uid: string,
  profile: UserProfileInput
): Promise<void> {
  const name = profile.name?.trim();
  const whatsapp = profile.whatsapp?.trim();
  const email = profile.email.trim();

  if (!name && !whatsapp) {
    return;
  }

  try {
    const profileRef = doc(db, 'profiles', uid);
    await setDoc(
      profileRef,
      {
        email,
        ...(name ? { name } : {}),
        ...(whatsapp ? { whatsapp } : {}),
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw new Error('Erro ao salvar perfil do usuário');
  }
}
