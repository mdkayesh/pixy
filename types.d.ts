import { Timestamp } from "firebase/firestore";

type PicImage = {
  docId?: string;
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL: string;
  imageURL: string;
  imageWidth: number;
  imageHeight: number;
  imageSize: number;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
  timestamp?: Timestamp;
};

type PicVideo = {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration: number;
  videos: {
    large: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
    medium: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
    small: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
    tiny: {
      url: string;
      width: number;
      height: number;
      size: number;
      thumbnail: string;
    };
  };
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  user_id: number;
  user: string;
  userImageURL: string;
};

type UserData = {
  name: string;
};

type Volume = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: [
      {
        type: string;
        identifier: string;
      }
    ];
    pageCount: number;
    dimensions: {
      height: string;
      width: string;
      thickness: string;
    };
    printType: string;
    mainCategory: string;
    categories: [string];
    averageRating: number;
    ratingsCount: number;
    contentVersion: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
      small: string;
      medium: string;
      large: string;
      extraLarge: string;
    };
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
  userInfo: {
    // "review": mylibrary.reviews Resource,
    // "readingPosition": mylibrary.readingpositions Resource,
    isPurchased: boolean;
    isPreordered: boolean;
    updated: string;
  };
  saleInfo: {
    country: string;
    saleability: string;
    onSaleDate: string;
    isEbook: boolean;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
    buyLink: string;
  };
  accessInfo: {
    country: string;
    viewability: string;
    embeddable: boolean;
    publicDomain: boolean;
    textToSpeechPermission: string;
    epub: {
      isAvailable: boolean;
      downloadLink: string;
      acsTokenLink: string;
    };
    pdf: {
      isAvailable: boolean;
      downloadLink: string;
      acsTokenLink: string;
    };
    webReaderLink: string;
    accessViewStatus: string;
    downloadAccess: {
      kind: string;
      volumeId: string;
      restricted: boolean;
      deviceAllowed: boolean;
      justAcquired: boolean;
      maxDownloadDevices: number;
      downloadsAcquired: number;
      nonce: string;
      source: string;
      reasonCode: string;
      message: string;
      signature: string;
    };
  };
  searchInfo: {
    textSnippet: string;
  };
};
