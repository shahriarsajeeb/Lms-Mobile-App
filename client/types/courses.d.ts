type CommentType = {
  _id: string;
  user: User;
  question: string;
  questionReplies: CommentType[];
};

type ReviewType = {
  user: User;
  rating?: number;
  comment: string;
  commentReplies?: ReviewType[];
};

type LinkType = {
  title: string;
  url: string;
};

type CourseDataType = {
  _id: string | any;
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: LinkType[];
  suggestion: string;
  questions: CommentType[];
};

type BenefitType = {
  title: string;
};

type PrerequisiteType = {
  title: string;
};

type CoursesType = {
  _id: any;
  name: string;
  description: string;
  categories: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: {
    public_id: string | any;
    url: string | any;
  };
  tags: string;
  level: string;
  demoUrl: string;
  benefits: BenefitType[];
  prerequisites: PrerequisiteType[];
  reviews: ReviewType[];
  courseData: CourseDataType[];
  ratings?: number;
  purchased: number;
};
