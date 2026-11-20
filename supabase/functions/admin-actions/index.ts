import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const ADMIN_CODE = Deno.env.get('ADMIN_CODE')!

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  // Gestion CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { action, code } = await req.json()

    // Vérification du code admin
    if (code !== ADMIN_CODE) {
      return new Response(
        JSON.stringify({ error: 'Code invalide' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Récupérer l'ID du scrutin (singleton)
    const { data: scrutinData, error: scrutinError } = await supabase
      .from('scrutin')
      .select('id')
      .single()

    if (scrutinError || !scrutinData) {
      return new Response(
        JSON.stringify({ error: 'Scrutin non trouvé' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const scrutinId = scrutinData.id

    switch (action) {
      case 'open': {
        const { error } = await supabase
          .from('scrutin')
          .update({ ouvert: true })
          .eq('id', scrutinId)
        if (error) throw error
        break
      }
      case 'close': {
        const { error } = await supabase
          .from('scrutin')
          .update({ ouvert: false })
          .eq('id', scrutinId)
        if (error) throw error
        break
      }
      case 'reset': {
        // Supprimer tous les votes
        const { error: deleteError } = await supabase
          .from('votes')
          .delete()
          .neq('id', '00000000-0000-0000-0000-000000000000') // delete all
        if (deleteError) throw deleteError

        // Fermer le scrutin
        const { error: updateError } = await supabase
          .from('scrutin')
          .update({ ouvert: false })
          .eq('id', scrutinId)
        if (updateError) throw updateError
        break
      }
      case 'count': {
        const { count, error } = await supabase
          .from('votes')
          .select('*', { count: 'exact', head: true })
        if (error) throw error
        return new Response(
          JSON.stringify({ count: count ?? 0 }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      default:
        return new Response(
          JSON.stringify({ error: 'Action inconnue' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message ?? 'Erreur serveur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})