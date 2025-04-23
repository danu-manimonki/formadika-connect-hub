
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventsManager() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events Management</CardTitle>
        <CardDescription>Create, view, edit, and delete community events</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center py-8 text-muted-foreground">
          Events management functionality will be implemented here
        </p>
      </CardContent>
    </Card>
  );
}
