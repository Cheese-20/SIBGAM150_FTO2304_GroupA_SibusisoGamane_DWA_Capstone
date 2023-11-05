import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://kedoblxacqfbaufcpgoi.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlZG9ibHhhY3FmYmF1ZmNwZ29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg1MzI1OTEsImV4cCI6MjAxNDEwODU5MX0.xwmaTnFfzRnHG_Tk3dfrOGpDJOEUKOp7Fhj_thEqmbI"
  );

  export default supabase