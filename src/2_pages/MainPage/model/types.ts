export type DisplayCheckbox = 'published' | 'mainPage';
export type XmlCheckbox = 'xmlYandex' | 'xmlFacebook' | 'xmlCian' | 'xmlAvito';
export type CianPlacementRadio = 'free' | 'paid' | 'color' | 'premium' | 'top';

export type ObjectGeneralForm = {
  display: Record<DisplayCheckbox, boolean>;
  xml: Record<XmlCheckbox, boolean>;
  cianPlacement: CianPlacementRadio;
  cianAuctionBid: number;
};

export type ObjectLocationForm = {};

export type ObjectPhotoForm = {};

export type ObjectAgentForm = {};

export type ObjectLinksForm = {};

export type ObjectData = {
  general: ObjectGeneralForm;
  location: ObjectLocationForm;
  photo: ObjectPhotoForm;
  agent: ObjectAgentForm;
  links: ObjectLinksForm;
};
