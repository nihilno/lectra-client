import { BACKEND_BASE_URL } from "@/constants";
import { ListResponse } from "@/types";
import { CreateResponse, HttpError } from "@refinedev/core";
import { createDataProvider, CreateDataProviderOptions } from "@refinedev/rest";

if (!BACKEND_BASE_URL) {
  throw new Error("BACKEND_BASE_URL is not defined");
}

async function buildHttpError(res: Response): Promise<HttpError> {
  let message = `HTTP error! status: ${res.status}`;
  try {
    const payload = (await res.json()) as { message?: string };
    if (payload?.message) message = payload.message;
  } catch {
    // ignore
  }

  return {
    message,
    statusCode: res.status,
  };
}

const options: CreateDataProviderOptions = {
  getList: {
    getEndpoint: ({ resource }) => resource,
    buildQueryParams: async ({ resource, filters, pagination }) => {
      const page = pagination?.currentPage ?? 1;
      const pageSize = pagination?.pageSize ?? 10;

      const params: Record<string, string | number> = { page, limit: pageSize };
      filters?.forEach((filter) => {
        const field = "field" in filter ? filter.field : "";
        const value = String(filter.value);

        if (resource === "subjects") {
          if (field === "department") params.department = value;
          if (field === "name" || field === "code") params.search = value;
        }

        if (resource === "classes") {
          if (field === "teacherId") params.teacher = value;
          if (field === "name") params.search = value;
        }
      });

      return params;
    },

    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.clone().json();
      return payload.data || [];
    },
    getTotalCount: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const payload: ListResponse = await response.clone().json();
      return payload.pagination?.total ?? payload.data?.length ?? 0;
    },
  },
  create: {
    getEndpoint: ({ resource }) => resource,
    buildBodyParams: async ({ variables }) => variables,
    mapResponse: async (response) => {
      if (!response.ok) throw await buildHttpError(response);
      const json: CreateResponse = await response.json();
      return json.data;
    },
  },
};

const { dataProvider } = createDataProvider(BACKEND_BASE_URL, options);

export { dataProvider };
