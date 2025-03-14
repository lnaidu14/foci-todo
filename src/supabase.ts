import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://elhuptgdsxumiudgvtzq.supabase.co"
const supabaseProjKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsaHVwdGdkc3h1bWl1ZGd2dHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NzQyNzYsImV4cCI6MjA1NzU1MDI3Nn0._ENtjD_Fl5t16Rl44TPF6xM27EZvdrS10HdBWCcoZrM"

export default createClient(supabaseUrl, supabaseProjKey)

