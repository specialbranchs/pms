import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import client from '../client';
import { ReportSearch } from '../../../typings/structures';
import { ReportDataItem } from '../../../typings/formData';
export type ReportResponseData = {
    id: number;
    title: string;
    body: string;
    user_report: Array<{
        id: number;
        picture: string;
    }>;
}[]
const searchReportList$ = (data: ReportSearch): Observable<ReportResponseData> => client
    .post<ReportResponseData>('report_get', {
        ...data
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data
            const reports: ReportResponseData = responseData.map((report) => ({
                id: report.id,
                title: report.title,
                body: report.body,
                user_report: report.user_report
            }));
            return reports;
        })
    );
export const makeFormData = (data: ReportDataItem) => {
    const file = data.picture

    let formData = new FormData();

    file.forEach(element => {
        formData.append('uploaded_file', element)
        //  console.log(element)
    });

    formData.append('title', data.title)
    formData.append('body', data.body)
    formData.append('doron', data.doron)

    return formData
}

const setReport$ = (data: ReportDataItem): Observable<ReportDataItem> => client
    .post<ReportDataItem>('reportAdd', makeFormData(data), {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );

const genReport$ = (): Observable<any> => client
    .get<any>('generate_report')
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
const getAppointment$ = (created: string): Observable<any> => client
    .post<any>('appointments', {
        created: created
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
const updateAppointment$ = (id: number, appoint_time: string | null, note: string, status: number): Observable<any> => client
    .put<any>('appointments', {
        id: id,
        appoint_time: appoint_time,
        note: note,
        status: status
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );

const getSingleAppointment$ = (id: number, created: string): Observable<any> => client
    .post<any>('getsingleappoint', {
        id: id,
        created: created
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
const CreateSingleAppointment$ = (id: number, reason: string, location: number, other: string,desiredtime:string, created: string): Observable<any> => client
    .post<any>('createappointment', {
        id: id,
        created: created,
        reason: reason,
        location: location,
        desiredtime:desiredtime,
        other: other
    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
const CountInQueue = (status: number, created: string): Observable<any> => client
    .post<any>('count', {
        status: status,
        created: created,

    })
    .pipe(
        map((response) => {
            // console.log('res', response.data)
            const responseData = response.data

            return responseData;
        })
    );
export default {
    searchReportList$,
    setReport$,
    genReport$,
    getAppointment$,
    updateAppointment$,
    getSingleAppointment$,
    CreateSingleAppointment$,
    CountInQueue
}


