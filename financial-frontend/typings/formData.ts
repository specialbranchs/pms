
export type SignInData = {
  bpNumber: string;
  password: string;
};

export type SignUpData = {
  email: string;
  password: string;
  confirmPassword: string;

};


export type AppState = {
  appState: string;
};

export type SearchDataItem = {
  name: string;
  fatherName: string;
  tinNumber: string;
  nid: string;
  podok: number;
  child:number;
  podokpost: string;
  start: string | null;
  end: string | null;

};

export type ReportDataItem = {
  id: number;
  doron: string;
  title: string;
  body: string;
  picture: File[]
}

export type PersonFormData = {
  podok: number;
  child:number;
  podokdate: string;
  name: string;
  fatherName: string;
  motherName: string;
  nid: string;
  tinNumber: string;
  picture: File|null;

  parmentAdd: string;
  presentAdd: string;
  birthPlace: string;
  dateOfBirth: string;
  height: string;
  bodyColor: string;
  clue: string;
  religion: string;
  mobile: string;
  passport: string;
  education: string;
  family: string;
  wealth: string;
  profession: string;
  income: string;
  business: string;
  contribution: string;
  politicalInfo: string;
  electionInfo: string;
  mamlaInfo: string;
  sabotageInfo: string;
  arrestOrder: string;
  arrestInfo: string;
  corruptionInfo: string;
  thanaRecord: string;
  influential: string;
  evaluation: string;

}

export type ShowDataType={
  title:string;
  display:string;
  id:number;
  
}

export type UploadUserData={
  bpNumber:string;
  name:string;
  email:string;
  phone:string;
  designation:number;
  sbid:string;
  password:string;
  is_admin:boolean;
  is_staff:boolean;
}

type DesignationType={
  id:number;
  dig_name:string;
}
export type ResUserData={
  id:number;
  name:string;
  email:string;
  is_admin:boolean;
  is_staff:boolean;
  is_superuser:boolean;
}
export type ReportType={
  doron: string;
  title:string;
  body: string;
  id: number,
  picture: Array<any>;
}


export type PatientAppType={
  reason:string;
  desiredtime:string;
  location:number;
  other:string
}
export type UploadDoctorUserData={
  bpNumber:string;
  name:string;
  email:string;
  phone:string;
  sbid:string;
  password:string;
  is_admin:boolean;
  is_staff:boolean;
}