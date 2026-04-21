import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cxsjnwqoybfoxpkdqwpo.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c2pud3FveWJmb3hwa2Rxd3BvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1MDkwMDcsImV4cCI6MjA5MjA4NTAwN30.WJn_PVgQWKtL0QPq9Ymw8GD5uyIca5bCWkS68jQVujk"; // from settings

export const supabase = createClient(supabaseUrl, supabaseKey);