import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadFileToSupabaseAndReturnUrl = async (file: File): Promise<string> => {
  try {
    const filePath = `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from('cv-app.blog') // varmista että tämä on oikea bucket-nimi
      .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from('cv-app.blog')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Tiedoston lataus epäonnistui:', error);
    throw new Error('Tiedoston lataus Supabaseen epäonnistui.');
  }
};


