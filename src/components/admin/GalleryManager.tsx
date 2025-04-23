
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GalleryManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Galeri</CardTitle>
        <CardDescription>Unggah dan kelola foto atau video dokumentasi kegiatan</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen galeri akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
