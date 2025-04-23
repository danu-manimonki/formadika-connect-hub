
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArticlesManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Articles Management</CardTitle>
        <CardDescription>Create, view, edit, and delete community articles</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Articles management functionality will be implemented here
        </p>
      </CardContent>
    </Card>
  );
}
