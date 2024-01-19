import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Designation, DesignationType, Zone } from '../../../typings/structures';
import client from '../client';
import { PodokType } from '../../modules/pages/search/editsearch/EditPodok';



type GetDesignationListResponse = {
  id: number;
  title: string;

}[];

type GetPmsDesignationListResponse = {
  id: number;
  dig_name: string;

}[];

type GetPmsZoneListResponse = {
  id: number;
  zone: string;

}[];

const getDesignationList = (): Observable<Array<Designation>> => client.get<GetDesignationListResponse>('podok_get').pipe(
  map((response) => {
    const responseData = response.data;
    //  console.log("response ", responseData)
    const designations: Array<Designation> = responseData.map((specializationData) => ({
      id: specializationData.id,
      title: specializationData.title
    }));

    return designations;
  })
);

const MakeForm = (podok: PodokType) => {
  let formData = new FormData();
  formData.append('id', podok.id + '')
  formData.append('podok', podok.podok)
  formData.append('child', podok.child)
  formData.append('podokdate', podok.podokdate)

  return formData
}
const setDesignations = (podok: PodokType): Observable<Array<any>> => client.post<any>('podokAdd', MakeForm(podok)).pipe(
  map((response) => {
    const responseData = response.data;
    // console.log("response ", responseData)

    return responseData;
  })
)
const getDororList = (): Observable<Array<Designation>> => client.get<GetDesignationListResponse>('doron_get').pipe(
  map((response) => {
    const responseData = response.data;
    // console.log("response ", responseData)
    const designations: Array<Designation> = responseData.map((specializationData) => ({
      id: specializationData.id,
      title: specializationData.title
    }));

    return designations;
  })
);

const getChildPodokList = (id: number): Observable<Array<Designation>> => client.post<GetDesignationListResponse>('child_podok', { id: id }).pipe(
  map((response) => {
    const responseData = response.data;
    // console.log("child response ", response)
    const designations: Array<Designation> = responseData.map((specializationData) => ({
      id: specializationData.id,
      title: specializationData.title
    }));

    return designations;
  })
);


const getPmsDesignationList = (): Observable<Array<DesignationType>> => client.get<GetPmsDesignationListResponse>('designations').pipe(
  map((response) => {
    const responseData = response.data;
    //  console.log("response ", responseData)
    const designations: Array<DesignationType> = responseData.map((specializationData) => ({
      id: specializationData.id,
      dig_name: specializationData.dig_name
    }));

    return designations;
  })
);
const getPmsZoneList = (): Observable<Array<Zone>> => client.get<GetPmsZoneListResponse>('zone').pipe(
  map((response) => {
    const responseData = response.data;
    //  console.log("response ", responseData)
    const zones: Array<Zone> = responseData.map((specializationData) => ({
      id: specializationData.id,
      zone: specializationData.zone
    }));

    return zones;
  })
);

export default {
  getDesignationList,
  setDesignations,
  getDororList,
  getChildPodokList,
  getPmsDesignationList,
  getPmsZoneList

};