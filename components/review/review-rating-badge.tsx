import { Star } from "lucide-react";
import { Badge } from "../ui/badge";


interface ReviewRatingBadgeProps {
  averageRating: String;
}

const ReviewRatingBadge = ({
  averageRating,
}:ReviewRatingBadgeProps) => {
  return (
<Badge className="flex items-center gap-2 bg-fuchsia-600/10 hover:bg-fuchsia-600/20 hover:text-fuchsia-600 text-fuchsia-600">
            <div className="flex items-center gap-1">
              <span className="flex gap-1 items-center">
                {averageRating} <Star className="w-3 h-3" />
              </span>
              /
              <span className="flex gap-1 items-center">
                5 <Star className="w-3 h-3" />
              </span>
            </div>
          </Badge>
  );
}
export default ReviewRatingBadge;