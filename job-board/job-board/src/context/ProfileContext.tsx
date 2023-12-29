import { useState, createContext, useContext, ReactNode } from "react";

type CAN = { fullname: string; email: string };
type EMP = { name: string; email: string; location: string; website?: string };
type ProfileInt = CAN | EMP | null;
type ProfileCxt = {
  profile: ProfileInt;
  updateProfile: (user: CAN | EMP) => void;
};
const ProfileContext = createContext<ProfileCxt | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const USER = import.meta.env.VITE_PROFILE;
  const profil = localStorage.getItem(USER);
  const profilObj = profil ? JSON.parse(profil) : null;
  const [profile, setProfile] = useState<ProfileInt>(profilObj);

  const updateProfile = (user: CAN | EMP) => {
    setProfile((prevProfile) => {
      return prevProfile ? { ...prevProfile, ...user } : { ...user };
    });
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) throw Error("Context used out of Provider!");
  return context;
}
// eslint-disable-next-line react-refresh/only-export-components
export default useProfileContext;
