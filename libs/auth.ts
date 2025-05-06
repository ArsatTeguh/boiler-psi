import { JWTAuth } from "jwt-usu";
import { redirect } from "next/navigation";
import { getSsotok } from "./getSsotok";
import fetchAPI from "../config/fetch-api";
import { keysToCamel } from "./mapper";
import SsoResponse from "../interfaces/sso-response";


// Fungsi untuk berkomunikasi dengan server menggunakan JWT dan token
export const JWTAuthCommunicate = (server: string, token: any) => {
  return new Promise(async (resolve) => {
    fetch(server, {
      method: "get",
      headers: { Authorization: "Bearer " + token },
    })
      .then((res) => res.json())
      .then((response) => {
        resolve(response); // Jika berhasil, kirim respon ke resolve
      })
      .catch((err) => {
        // Jika terjadi error
        resolve({
          loggend_in: false,
          connected: false,
          token: token,
          error: err.getMessage(),
        });
      });
  });
};

// Fungsi utama untuk melakukan otentikasi SSO
export async function SSOAuthentication(token?: string) {
  const ssotok = getSsotok(); // Mengambil token SSO dari fungsi getSsotok

  let responseSso: any = null; // Variabel untuk menyimpan respon dari server SSO
  let ssoPage: string = ""; // Variabel untuk menyimpan URL login SSO jika user belum login

  try {
    // Berusaha melakukan komunikasi dengan server SSO untuk memvalidasi token
    responseSso = await JWTAuthCommunicate(
      "https://akun.usu.ac.id/auth/listen",
      ssotok
    );

    // Jika user tidak login, redirect ke halaman login SSO
    if (!responseSso.logged_in) {
      // Membuat URL untuk login SSO
      ssoPage = JWTAuth.makeLink({
        baseUrl: "https://akun.usu.ac.id/auth/login", // URL login SSO
        redir: process.env.NEXT_PUBLIC_APPS_URL, // URL redirect setelah login
        callback: "",
      });
    }
  } catch (error) {
    // Jika terjadi error selama proses komunikasi SSO
    console.log(error);
    console.error("Error sso: " + error);
    return {
      error: true,
      data: null,
      token: ssotok,
      code: 500,
      message: "Internal Server Error",
    };
  }

  // Jika ssoPage berisi URL, redirect user ke halaman login SSO
  if (ssoPage) redirect(ssoPage);

  // Melakukan request ke API untuk autorisasi dan mendapatkan detail pengguna (user)
  const user = await fetchAPI({ path: "/auth/me", isCache: false });
  if (user.data) responseSso.payload.detail = user.data; // Jika ada data pengguna, tambahkan ke payload SSO

  return {
    ...user, // Mengembalikan respon user dari API
    data: keysToCamel(responseSso.payload) as SsoResponse, // Ubah payload dari server SSO menjadi camelCase dan cast ke tipe SsoResponse
    token: ssotok, // Sertakan token SSO
  };
}
