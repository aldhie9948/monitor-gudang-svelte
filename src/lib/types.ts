export interface TypeBarang {
  id_tipe: number;
  kode: string;
  nama: string;
  jenis: string;
  total: number;
}

export interface StokBarang {
  kode_barang: string;
  nama_barang: string;
  satuan: string;
  kategori: string;
  tipe_barang: string;
  gudang: string;
  active: string;
  stok: string;
  kode_tipe: string;
  nama_tipe: string;
}

export type StatusStock = -1 | 0 | 1;

export interface HistoriStokBarang {
  nama_barang: string;
  gudang: string;
  kode_barang: string;
  masuk: string;
  keluar: string;
  sisa_stok: string;
  no_lot: string;
  tanggal: string;
  id: number;
}

export interface RecordStock {
  status: StatusStock;
  total: number;
}

export interface DetailTransactionParams {
  kode: string;
  start: string;
  end: string;
  limit?: number;
}
