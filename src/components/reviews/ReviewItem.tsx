import { IReview } from "@/models/Review";
import { formatDate } from "@/lib/utils";
import StarRating from "../ui/StarRating";

interface ReviewItemProps {
  review: IReview;
}

export default function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div className="border p-4 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold">{review.userName}</h3>
          <StarRating rating={review.rating} />
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(review.createdAt)}
        </span>
      </div>
      <p className="mt-2">{review.comment}</p>
    </div>
  );
}
