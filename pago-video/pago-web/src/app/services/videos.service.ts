import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../redux/store'
import { urlBaseApiDev } from '../common/base-url'
import { UploadResponse } from './model/videos';

export const videosApi = createApi({
  reducerPath: 'videosApi',
  tagTypes: ['Post', 'Get'],
  baseQuery: fetchBaseQuery({
    baseUrl: `${urlBaseApiDev}/videos`,
    prepareHeaders: (headers, { getState }) => {
      const { access_token } = (getState() as RootState).authReducer;
      if (access_token) {
        headers.set('authorization', `Bearer ${access_token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    uploadVideo: build.mutation<UploadResponse, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
    }),
    status: build.query<any, string>({
      query: (filename) => ({
        url: `${filename}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useUploadVideoMutation, useStatusQuery, useLazyStatusQuery } = videosApi;
