import React from 'react';
import { FileCode, Plus, Check } from 'lucide-react';
import { Project } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface ProjectCardProps {
  project: Project;
  inWishlist?: boolean;
  onAddToWishlist?: (projectId: number) => void;
  onRemoveFromWishlist?: (projectId: number) => void;
  showActions?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  inWishlist = false, 
  onAddToWishlist,
  onRemoveFromWishlist,
  showActions = true
}) => {
  return (
    <Card className="h-full transition-all duration-300 hover:shadow-lg">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <FileCode className="h-5 w-5 text-purple-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-gray-900 mb-2">{project.title}</h3>
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          {showActions && (
            <div className="flex justify-end">
              {inWishlist ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(project.id)}
                  className="text-green-600 border-green-600"
                >
                  <Check size={16} className="mr-1" />
                  In Wishlist
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onAddToWishlist && onAddToWishlist(project.id)}
                >
                  <Plus size={16} className="mr-1" />
                  Add to Wishlist
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;