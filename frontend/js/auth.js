const TOKEN_KEY = "seenema_token";
const USER_KEY = "seenema_user";

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const auth = {
  saveSession(token, userData = null) {
    localStorage.setItem(TOKEN_KEY, token);

    const decoded = decodeJwtPayload(token) || {};
    const mergedUser = {
      id_usuario: userData?.id_usuario ?? decoded.id_usuario ?? decoded.id ?? decoded.sub ?? null,
      nome: userData?.nome ?? decoded.nome ?? "Cinéfilo",
      email: userData?.email ?? decoded.email ?? "",
      foto: userData?.foto ?? decoded.foto ?? null,
    };

    localStorage.setItem(USER_KEY, JSON.stringify(mergedUser));
    return mergedUser;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  getUserId() {
    const user = this.getUser();
    return user?.id_usuario ? Number(user.id_usuario) : null;
  },

  isAuthenticated() {
    return Boolean(this.getToken() && this.getUserId());
  },

  logout(redirectToLogin = true) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    if (redirectToLogin) {
      window.location.href = "./login.html";
    }
  },
};