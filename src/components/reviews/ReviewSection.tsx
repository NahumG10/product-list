"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IReview } from "@/models/Review";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

interface ReviewSectionProps {
  productId: string;
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/reviews?productId=${productId}`);
      setReviews(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("Failed to load reviews. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleReviewAdded = () => {
    fetchReviews();
  };

  return (
    <div>
      <ReviewForm productId={productId} onReviewAdded={handleReviewAdded} />

      <div className="mt-8">
        {loading ? (
          <p className="text-center">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </div>
  );
}
