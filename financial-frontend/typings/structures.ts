export type User = {
  id: number;
  refresh: string;
  access: string;
  email: string;
  is_superuser: boolean;
  is_adminuser: boolean;
  is_staff: boolean;

};

export type Designation = {
  id: number;
  title: string;
}

export type Zone = {
  id: number;
  zone: string;
}
export type DesignationType = {
  id: number;
  dig_name: string;
}


export type ReportSearch = {
  title: string,
  catagory: string
}