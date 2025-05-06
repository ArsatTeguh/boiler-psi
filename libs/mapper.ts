// Mengubah string dari snake_case atau kebab-case ke camelCase
function toCamel(s: string): string {
    return s.replace(/([-_][a-z])/gi, ($1) => {
      // Menghapus tanda minus atau underscore, lalu mengubah huruf berikutnya menjadi huruf besar
      return $1.toUpperCase().replace("-", "").replace("_", "");
    });
  }
  
  // Mengubah string dari camelCase menjadi snake_case
  function toSnake(s: string): string {
    // Menemukan setiap huruf besar dan menambahkan underscore sebelum huruf tersebut, lalu mengubahnya menjadi huruf kecil
    return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
  
  // Fungsi rekursif untuk mengubah semua key di objek dari snake_case/kebab-case ke camelCase
  export function keysToCamel<T>(o: any): T {
    // Memastikan bahwa `o` adalah objek, bukan array atau function
    if (o === Object(o) && !Array.isArray(o) && typeof o !== "function") {
      const n: any = {};
      Object.keys(o).forEach((k) => {
        // Ubah setiap key ke camelCase dan rekursif pada nilai-nilainya
        n[toCamel(k)] = keysToCamel(o[k]);
      });
      return n as T;
    }
    // Jika `o` adalah array, lakukan rekursif pada setiap elemen array
    if (Array.isArray(o)) {
      return o.map((i) => {
        return keysToCamel(i);
      }) as unknown as T;
    }
    // Jika `o` bukan objek atau array, kembalikan nilai asli
    return o as T;
  }
  
  // Fungsi rekursif untuk mengubah semua key di objek dari camelCase menjadi snake_case
  export function keysToSnake<T>(o: any): T {
    // Memastikan bahwa `o` adalah objek, bukan array atau function
    if (o === Object(o) && !Array.isArray(o) && typeof o !== "function") {
      const n: any = {};
      Object.keys(o).forEach((k) => {
        // Ubah setiap key ke snake_case dan rekursif pada nilai-nilainya
        n[toSnake(k)] = keysToSnake(o[k]);
      });
      return n as T;
    }
    // Jika `o` adalah array, lakukan rekursif pada setiap elemen array
    if (Array.isArray(o)) {
      return o.map((i) => {
        return keysToSnake(i);
      }) as unknown as T;
    }
    // Jika `o` bukan objek atau array, kembalikan nilai asli
    return o as T;
  }
  