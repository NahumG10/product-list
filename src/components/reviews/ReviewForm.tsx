"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import StarRatingInput from "../ui/StarRatingInput";

const reviewSchema = z.object({
  userName: z.string().min(2, "Name must be at least 2 characters"),
  rating: z.number().min(1, "Please select a rating").max(5),
  comment: z.string().min(5, "Review must be at least 5 characters"),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onReviewAdded: () => void;
}

export default function ReviewForm({
  productId,
  onReviewAdded,
}: ReviewFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      userName: "",
      rating: 0,
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post("/api/reviews", {
        productId,
        ...data,
      });

      reset();
      setSuccess(true);
      onReviewAdded();
    } catch (err: any) {
      console.error("Error submitting review:", err);
      setError(
        err.response?.data?.error ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setValue("rating", rating, { shouldValidate: true });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>

      {success && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          Your review has been submitted successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="userName">
            Your Name
          </label>
          <input
            id="userName"
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            {...register("userName")}
          />
          {errors.userName && (
            <p className="text-red-500 mt-1">{errors.userName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Rating</label>
          <StarRatingInput onRatingChange={handleRatingChange} />
          {errors.rating && (
            <p className="text-red-500 mt-1">{errors.rating.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium" htmlFor="comment">
            Your Review
          </label>
          <textarea
            id="comment"
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            {...register("comment")}
          ></textarea>
          {errors.comment && (
            <p className="text-red-500 mt-1">{errors.comment.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
