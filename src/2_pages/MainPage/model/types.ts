export type DisplayCheckbox = 'published' | 'mainPage';
export type XmlCheckbox = 'xmlYandex' | 'xmlFacebook' | 'xmlCian' | 'xmlAvito';
export type CianPlacementRadio = 'free' | 'paid' | 'color' | 'premium' | 'top';
export type StatusRadio =
  | 'none'
  | 'sold'
  | 'reserve'
  | 'removed'
  | 'exclusive'
  | 'building';
export type SoldBy = 'newMoscowHouse' | 'otherAgency';
export type RealEstateType =
  | 'house'
  | 'plot'
  | 'townhouse'
  | 'flat'
  | 'apartments';

export type ObjectGeneralForm = {
  display: Record<DisplayCheckbox, boolean>;
  xml: Record<XmlCheckbox, boolean>;
  cianPlacement: CianPlacementRadio;
  cianAuctionBid: string;
  status: StatusRadio;
  soldBy?: SoldBy;
  soldDate?: string;
  owner: string;
  realEstateType: RealEstateType;
  cadastralPlotNumber: string;
  cadastralHouseNumber: string;
  price: string;
};

export type ObjectLocationForm = {};

export type ObjectPhotoForm = {};

export type ObjectAgentForm = {};

export type ObjectLinksForm = {};

export type ObjectData = {
  general?: ObjectGeneralForm;
  location?: ObjectLocationForm;
  photo?: ObjectPhotoForm;
  agent?: ObjectAgentForm;
  links?: ObjectLinksForm;
};

export type ObjectFormSchema = {
  data: ObjectData;
};
