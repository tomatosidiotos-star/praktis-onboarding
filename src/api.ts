import type { CurrentUser, MchdVerifyResult, UkepVerifyResult, CreatedCompany, PlatformModule } from './types';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function getCurrentUser(): Promise<CurrentUser> {
  await delay(300);
  return { fullName: 'Лаврентьев Александр', email: 'a.lavrentyev@setltech.ru', initials: 'ЛА' };
}

export async function verifyMchd(_file: File): Promise<MchdVerifyResult[]> {
  await delay(1200);
  return [
    {
      id: '123e4567-e89b-12d3-a456-426655440001',
      companyName: 'ООО "СтройДом"',
      inn: '7678889988',
      companyAddress: '190000, г. Санкт-Петербург, ул. Ленина, д. 1',
      validUntil: '19.04.2026',
      holderName: 'Лаврентьев Александр Игоревич',
      holderPosition: 'Генеральный директор',
      holderInn: '770012345678',
      holderSnils: '123-456-789 01',
    },
    {
      id: '789a4567-e89b-12d3-a456-426655440002',
      companyName: 'ООО "Прогресс"',
      inn: '7701234567',
      companyAddress: '129110, г. Москва, просп. Мира, д. 5',
      validUntil: '02.11.2026',
      holderName: 'Лаврентьев Александр Игоревич',
      holderPosition: 'Представитель',
      holderInn: '770012345678',
    },
  ];
}

export async function verifyMchdByNumber(_number: string): Promise<MchdVerifyResult[]> {
  await delay(900);
  return [
    {
      id: _number.trim() || 'mchd_002',
      companyName: 'ООО "СтройДом"',
      inn: '7678889988',
      companyAddress: '190000, г. Санкт-Петербург, ул. Ленина, д. 1',
      validUntil: '19.04.2026',
      holderName: 'Лаврентьев Александр Игоревич',
      holderPosition: 'Генеральный директор',
      holderInn: '770012345678',
      holderSnils: '123-456-789 01',
    },
  ];
}

export async function submitJoinRequest(_mchdId: string): Promise<{ requestId: string }> {
  await delay(400);
  return { requestId: 'req_001' };
}

export async function searchUkepCertificates(): Promise<UkepVerifyResult[]> {
  await delay(1500);
  return [
    { companyName: 'ООО "Ромашка"', inn: '7700000001', directorName: 'Иванов Иван Иванович' },
    { companyName: 'ООО "СтройПроект"', inn: '7712345678', directorName: 'Иванов Иван Иванович' },
  ];
}

export async function createCompany(data: { ukepId: string; companyName: string; inn: string }): Promise<CreatedCompany> {
  await delay(600);
  return { id: 'org_001', name: data.companyName, inn: data.inn };
}

export async function getAvailableModules(): Promise<PlatformModule[]> {
  await delay(200);
  return [
    { id: 'objects', name: 'Объекты',      description: 'Управление объектами строительства, их характеристиками и паспортами', access: 'free' },
    { id: 'refs',    name: 'Справочники',   description: 'Единые нормативные справочники и классификаторы для всех модулей', access: 'free' },
    { id: 'lkk',    name: 'ЛКК',           description: 'Личный кабинет клиента для взаимодействия с заказчиком и контроля хода работ', access: 'paid' },
    { id: 'ks',     name: 'КС',            description: 'Управление капитальным строительством, бюджетом и графиками (КС-2, КС-6)', access: 'free' },
    { id: 'mc',     name: 'Моя компания',   description: 'Управление профилем компании, сотрудниками и доступами', access: 'free' },
    { id: 'icona',  name: 'ICONA',          description: 'Аналитика и отчётность по строительным проектам в режиме реального времени', access: 'free' },
    { id: 'id',     name: 'ИД',            description: 'Цифровая исполнительная документация и стройконтроль', access: 'free' },
    { id: 'etp',    name: 'ЭТП',           description: 'Электронная тендерная площадка для проведения строительных закупок', access: 'paid' },
    { id: 'pir',    name: 'ПИР',           description: 'Управление проектно-изыскательскими работами и проектной документацией', access: 'paid' },
  ];
}
