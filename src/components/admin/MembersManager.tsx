
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MembersManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manajemen Anggota & Alumni</CardTitle>
        <CardDescription>Kelola data anggota dan alumni organisasi</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Fungsionalitas manajemen anggota dan alumni dengan pagination akan diimplementasikan di sini
        </p>
      </CardContent>
    </Card>
  );
}
