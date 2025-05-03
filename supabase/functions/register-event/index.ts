
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

// Define CORS headers for the API
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Define type for the registration data
interface EventRegistration {
  event_id: string
  user_id: string | null
  name: string
  email: string
  phone: string
  university: string
  faculty: string
  attendance_status: string
  registration_date: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders, status: 204 })
  }

  try {
    // Get registration data from request body
    const registration: EventRegistration = await req.json()
    
    // Create Supabase client with service role to bypass RLS
    // The service role can be used in Edge Functions
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    )

    // Check if the user has already registered with this email
    const { data: existingReg } = await supabaseAdmin
      .from('event_registrations')
      .select('id')
      .eq('event_id', registration.event_id)
      .eq('email', registration.email)
      .maybeSingle()

    if (existingReg) {
      return new Response(
        JSON.stringify({ error: { message: 'Email ini sudah terdaftar pada event ini' } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Insert the registration into the database
    const { error } = await supabaseAdmin
      .from('event_registrations')
      .insert(registration)

    if (error) {
      console.error('Registration error:', error)
      return new Response(
        JSON.stringify({ error: { message: error.message } }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Update the event's participants count
    await supabaseAdmin.rpc('increment_participants', { event_id: registration.event_id })

    // Return success response
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (err) {
    console.error('Error processing request:', err)
    return new Response(
      JSON.stringify({ error: { message: 'Internal server error' } }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
