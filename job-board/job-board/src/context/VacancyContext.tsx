import { useState, createContext, useContext, ReactNode } from "react";

type Job = {
  _id: string;
  position: string;
  salary: string;
  active: boolean;
  createdAt: Date;
};
type SET_JOBS = (jobs: Job[]) => void;
type ADD_JOB = (job: Job) => void;
type CANCEL_JOB = (job: Job) => void;

type VacancyContextProps = {
  jobs: Job[];
  handleSetJobs: SET_JOBS;
  handleAddJob: ADD_JOB;
  handleCancelJob: CANCEL_JOB;
};
const VacancyContext = createContext<VacancyContextProps | null>(null);

export function VacancyContextProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);

  const handleSetJobs: SET_JOBS = (jobs) => {
    setJobs([...jobs]);
  };
  const handleAddJob: ADD_JOB = (job) => {
    setJobs([job, ...jobs]);
  };
  const handleCancelJob: CANCEL_JOB = (job) => {
    const newJob = jobs.map((jb) => {
      if (jb._id.toString() === (job._id as string)) {
        return { ...jb, active: false };
      } else {
        return jb;
      }
    });
    setJobs([...newJob]);
  };
  return (
    <VacancyContext.Provider
      value={{ jobs, handleSetJobs, handleAddJob, handleCancelJob }}
    >
      {children}
    </VacancyContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default function useVacancyContext() {
  const context = useContext(VacancyContext);
  if (!context) throw Error("Context out of provider!");
  return context;
}
