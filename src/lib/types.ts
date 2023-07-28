export interface TypeBarang {
  id_tipe: number;
  kode: string;
  nama: string;
  jenis: string;
  total: number;
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

export interface HistoriStokBarang {
  nama_barang: string;
  gudang: string;
  masuk: string;
  keluar: string;
  sisa_stok: string;
  no_lot: string;
  tanggal: string;
  kode_barang: string;
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
