export interface TypeBarang {
  id_tipe: number;
  kode: string;
  nama: string;
  jenis: string;
}

export interface StokBarang {
  active: string;
  gudang: string;
  kategori: string;
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  stok: string;
  tipe_barang: string;
}

export type StatusStock = -1 | 0 | 1;
