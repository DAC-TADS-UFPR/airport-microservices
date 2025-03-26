import time from "@/utils/timeRevalidate";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

async function fetchWrapper(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(baseURL + url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Fetch Error: ", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

export async function getPage({ _, queryKey }: any): Promise<any> {
  const [key, id, section] = queryKey;
  let url = `/wp/V2/pages/${id}?_fields=acf.${section}`;
  if (!section) url = `/wp/V2/pages/${id}`;
  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time * 2, tags: ["page"] },
    });
    if (!section) return resp;
    return resp.acf[section];
  } catch (error: any) {
    console.log(queryKey, " getPage: ", error.message);
  }
}

export async function getPopup(): Promise<any> {
  try {
    const resp = await fetchWrapper(
      `/acf/V3/options/option?acf_format=standard`
    );
    return resp?.acf?.pop_up;
  } catch (error: any) {
    console.log("getPopup: ", error.message);
  }
}

export async function getHeader(): Promise<any> {
  try {
    const resp = await fetchWrapper(
      `/acf/V3/options/option?acf_format=standard`,
      {
        next: { revalidate: time * 2, tags: ["layout"] },
      }
    );
    return resp.acf.header;
  } catch (error: any) {
    console.log("getHeader: ", error.message);
  }
}

export async function getFooter(): Promise<any> {
  try {
    const resp = await fetchWrapper(
      `/acf/V3/options/option?acf_format=standard`,
      {
        next: { revalidate: time * 2, tags: ["layout"] },
      }
    );
    return resp.acf.footer;
  } catch (error: any) {
    console.log("getFooter: ", error.message);
  }
}

export async function getNewsLetter(): Promise<any> {
  try {
    const resp = await fetchWrapper(
      `/acf/V3/options/option?acf_format=standard`
    );
    return resp.acf.newsletter;
  } catch (error: any) {
    console.log("getNewsLetter: ", error.message);
  }
}

export async function sendForm(body: FormData, id: number): Promise<any> {
  const headers = {
    // Fetch automatically sets the correct headers for FormData
  };
  try {
    const resp = await fetchWrapper(
      `/contact-form-7/v1/contact-forms/${id}/feedback`,
      {
        method: "POST",
        body,
        headers,
      }
    );
    return resp;
  } catch (error: any) {
    console.log("sendForm: ", error.message);
  }
}

export async function getMeta(value: any, type?: string): Promise<any> {
  let url = `/acf/V3/pages/${value}/header_seo/`;
  if (type)
    url = `/wp/V2/${type}?slug=${value}&_fields=title,excerpt,acf.sectionOne,acf.header_seo`;
  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time * 3, tags: ["meta"] },
    });
    if (type) return resp[0];
    return resp?.header_seo;
  } catch (error: any) {
    console.log(value, "getMeta: ", error.message);
  }
}

export async function getH1(value: any): Promise<any> {
  try {
    const resp = await fetchWrapper(`/acf/V3/pages/${value}/h1_hidden/`, {
      next: { revalidate: time * 3, tags: ["meta"] },
    });
    if (resp?.h1_hidden) return resp?.h1_hidden;
    return "";
  } catch (error: any) {
    console.log(value, "getH1: ", error.message);
  }
}

export async function getStrData({ _, queryKey }: any): Promise<any> {
  const [key, id] = queryKey;
  try {
    const resp = await fetchWrapper(`/acf/V3/pages/${id}/dados_estruturados/`, {
      next: { revalidate: time * 3, tags: ["meta"] },
    });
    return resp?.dados_estruturados;
  } catch (error: any) {
    console.log(queryKey, "getStrData: ", error.message);
  }
}

export async function getPostType({ _, queryKey }: any): Promise<any> {
  const [key, search, section, type] = queryKey;
  let url = `/wp/V2/${type}/${search}?_fields=acf.${section}`;
  if (!section) url = `/wp/V2/${type}/${search}?_embed`;
  if (isNaN(search))
    url = `/wp/V2/${type}?slug=${search}&_fields=acf.${section}`;
  if (isNaN(search) && !section) url = `/wp/V2/${type}/?slug=${search}&_embed`;
  try {
    const resp = await fetchWrapper(url, {
      next: { revalidate: time, tags: ["single"] },
    });
    if (isNaN(search) && !section) return resp[0];
    if (isNaN(search)) return resp[0].acf[section];
    if (!section) return resp;
    return resp.acf[section];
  } catch (error: any) {
    console.log(queryKey, " getPostType: ", error.message);
  }
}

export async function getPostsType({ pageParam, queryKey }: any): Promise<any> {
  const [key, params, type] = queryKey;
  try {
    const resp = await fetchWrapper(
      `/wp/V2/${type}?_embed&status=publish&page=${pageParam || 1}&${
        params || ""
      }`,
      {
        next: { revalidate: time * 2, tags: ["posts"] },
      }
    );
    return resp;
  } catch (error: any) {
    console.log(queryKey, " getPostsType: ", error.message);
  }
}

export async function getCategories(
  categorie: string,
  exclude?: boolean
): Promise<any> {
  try {
    const resp = await fetchWrapper(
      `/wp/V2/${categorie}${exclude ? "?exclude=1" : ""}`,
      {
        next: { revalidate: time * 2, tags: ["categories"] },
      }
    );
    return resp;
  } catch (error: any) {
    console.log(categorie, " getCategories: ", error.message);
  }
}

export async function getSearch(): Promise<any> {
  try {
    const resp = await fetchWrapper(`/wp/v2/search-link`);
    return resp;
  } catch (error: any) {
    console.log("getSearch: ", error.message);
  }
}
