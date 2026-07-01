export type OnboardingStep =
  | 'entry'
  | 'path-a-mchd-choice'
  | 'path-a-no-mchd'
  | 'path-a-upload-mchd'
  | 'path-a-sent'
  | 'path-b-upload-ukep'
  | 'path-b-select-company'
  | 'path-b-created'
  | 'final';

export interface CurrentUser {
  fullName: string;
  email: string;
  phone?: string;
  initials: string;
  companyName?: string;
}

export interface MchdVerifyResult {
  id: string;
  // Доверитель (компания, выдавшая МЧД)
  companyName: string;
  inn: string;
  companyAddress?: string;
  validUntil: string;
  // Доверенное лицо (представитель)
  holderName: string;
  holderPosition: string;
  holderInn?: string;
  holderSnils?: string;
}

export interface UkepVerifyResult {
  companyName: string;
  inn: string;
  directorName: string;
}

export interface CreatedCompany {
  id: string;
  name: string;
  inn: string;
}

export interface PlatformModule {
  id: string;
  name: string;
  description: string;
  access: 'free' | 'paid';
}
