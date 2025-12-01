// FIX: The triple-slash directive `/// <reference types="vite/client" />` must be at the very top of the file to provide TypeScript with Vite's client-side environment variable types.
/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

// CORREÇÃO CRÍTICA: Substituído import.meta.env por valores de placeholder
// para evitar falhas de inicialização em ambientes onde as variáveis
// de ambiente não são injetadas corretamente (resultando em Tela Branca).
// Se for usar o Supabase REAL, substitua as strings abaixo pelas suas chaves.

const supabaseUrl = 'https://PLACEHOLDER.supabase.co'; // <--- CORRIGIDO
const supabaseAnonKey = 'anon_key_PLACEHOLDER'; // <--- CORRIGIDO

// Nota: A verificação de erro ainda é mantida, mas não será acionada com os placeholders.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in .env.local file.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);