import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export interface UserProfile {
  name: string;
  whatsapp: string;
  email: string;
  updatedAt: any; // serverTimestamp
}

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
  profile: Omit<UserProfile, 'updatedAt'>
): Promise<void> {
  try {
    const profileRef = doc(db, 'profiles', uid);
    await setDoc(
      profileRef,
      {
        ...profile,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Erro ao salvar perfil:', error);
    throw new Error('Erro ao salvar perfil do usuário');
  }
}
