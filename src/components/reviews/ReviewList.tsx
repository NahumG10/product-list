import { IReview } from "@/models/Review";
import ReviewItem from "./ReviewItem";

interface ReviewListProps {
  reviews: IReview[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-center py-4">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewItem key={review._id.toString()} review={review} />
      ))}
    </div>
  );
}
