import { auth } from "./auth.js";

export const API_BASE_URL = "http://localhost:3000";

const FALLBACK_POSTER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
      <rect width="300" height="450" fill="#141216"/>
      <rect x="12" y="12" width="276" height="426" rx="8" fill="none" stroke="#3D121C" stroke-width="2"/>
      <text x="150" y="215" fill="#7A1C2E" font-family="sans-serif" font-size="22" font-weight="bold" text-anchor="middle">SEEnema</text>
      <text x="150" y="245" fill="#635B60" font-family="sans-serif" font-size="13" text-anchor="middle">Sem pôster cadastrado</text>
    </svg>
  `);

export function resolveMediaUrl(filePath, fallback = FALLBACK_POSTER) {
  if (!filePath) return fallback;
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  const normalized = filePath.startsWith("/") ? filePath : `/uploads/${filePath}`;
  return `${API_BASE_URL}${normalized}`;
}

export async function apiRequest(endpoint, options = {}) {
  const { method = "GET", body = null, headers = {}, skipAuthRedirect = false } = options;

  const finalHeaders = { ...headers };
  const token = auth.getToken();

  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  let finalBody = body;
  const isFormData = body instanceof FormData;

  if (body && !isFormData && typeof body === "object") {
    finalHeaders["Content-Type"] = "application/json";
    finalBody = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: finalHeaders,
    body: finalBody,
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (response.status === 401 && !skipAuthRedirect) {
      auth.logout(true);
    }

    const errorMessage =
      data?.message || data?.error || `Erro na requisição (${response.status})`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.code = data?.code || null;
    throw error;
  }

  return data;
}

/* =========================================================
 * Endpoints mapeados por entidade do Backend
 * ========================================================= */

export const authApi = {
  // Ajuste o caminho caso sua rota de login esteja em "/auth/login" ou "/api/login"
  login: (email, senha) =>
    apiRequest("/auth/api/login", {
      method: "POST",
      body: { email, senha },
      skipAuthRedirect: true,
    }),
};

export const usuarioApi = {
  listarTodos: () => apiRequest("/api/usuario"),
  buscarPorId: (id) => apiRequest(`/api/usuario/${id}`),
  cadastrar: (payload) =>
    apiRequest("/api/usuario", {
      method: "POST",
      body: payload, // Aceita objeto JSON ou FormData (com foto)
      skipAuthRedirect: true,
    }),
  atualizar: (id, payload) =>
    apiRequest(`/api/usuario/${id}`, {
      method: "PUT",
      body: payload,
    }),
};

export const obraApi = {
  listarTodas: () => apiRequest("/api/obra"),
  buscarPorId: (id) => apiRequest(`/api/obra/${id}`),
  criar: (payload) =>
    apiRequest("/api/obra", {
      method: "POST",
      body: payload, // Aceita FormData (com imagem) ou JSON
    }),
  atualizar: (id, payload) =>
    apiRequest(`/api/obra/${id}`, {
      method: "PUT",
      body: payload,
    }),
  deletar: (id) =>
    apiRequest(`/api/obra/${id}`, {
      method: "DELETE",
    }),
};

export const generoApi = {
  listarTodos: () => apiRequest("/api/genero"),
  buscarPorId: (id) => apiRequest(`/api/genero/${id}`),
  criar: (nome) =>
    apiRequest("/api/genero", {
      method: "POST",
      body: { nome },
    }),
};

export const statusObraApi = {
  listarTodos: () => apiRequest("/api/status_obra"),
  listarPorUsuario: (idUsuario) => apiRequest(`/api/status_obra/usuario/${idUsuario}`),
  listarPorObra: (idObra) => apiRequest(`/api/status_obra/obra/${idObra}`),
  buscarPorIds: (idUsuario, idObra) =>
    apiRequest(`/api/status_obra/${idUsuario}/${idObra}`),
  criar: ({ id_usuario, id_obra, status, nota = null }) =>
    apiRequest("/api/status_obra", {
      method: "POST",
      body: { id_usuario, id_obra, status, nota },
    }),
  atualizar: (idUsuario, idObra, { status, nota }) =>
    apiRequest(`/api/status_obra/${idUsuario}/${idObra}`, {
      method: "PUT",
      body: { status, nota },
    }),
  deletar: (idUsuario, idObra) =>
    apiRequest(`/api/status_obra/${idUsuario}/${idObra}`, {
      method: "DELETE",
    }),
};

export const obraGeneroApi = {
  listarTodos: () => apiRequest("/api/obra_genero"),
  listarPorObra: (idObra) => apiRequest(`/api/obra_genero/obra/${idObra}`),
  listarPorGenero: (idGenero) => apiRequest(`/api/obra_genero/genero/${idGenero}`),
  vincular: (id_obra, id_genero) =>
    apiRequest("/api/obra_genero", {
      method: "POST",
      body: { id_obra, id_genero },
    }),
  desvincular: (idObra, idGenero) =>
    apiRequest(`/api/obra_genero/${idObra}/${idGenero}`, {
      method: "DELETE",
    }),
};