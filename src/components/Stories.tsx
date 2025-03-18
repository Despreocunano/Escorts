import { useEffect, useState, useRef } from 'react';
import { supabase, hasSupabaseCredentials } from '../lib/supabase';

interface Model {
  id: string;
  name: string;
  main_image: string;
  stories?: string[];
}

export default function Stories() {
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStory, setActiveStory] = useState<{
    modelId: string;
    storyIndex: number;
    video: string;
    modelName: string;
    modelImage: string;
    stories: string[];
  } | null>(null);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    async function fetchModels() {
      try {
        if (!hasSupabaseCredentials()) {
          setError('credentials_missing');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('models')
          .select('id, name, main_image, stories')
          .not('stories', 'is', null)
          .not('stories', 'eq', '{}')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setModels(data || []);
      } catch (error) {
        console.error('Error fetching models:', error);
        setError('fetch_error');
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, []);

  useEffect(() => {
    if (activeStory && videoRef.current) {
      const video = videoRef.current;
      
      // Reset video and progress when story changes
      video.currentTime = 0;
      setProgress(0);
      
      // Start progress tracking
      const duration = video.duration || 10;
      const updateInterval = 10; // Update every 10ms
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = setInterval(() => {
        if (video) {
          const currentProgress = (video.currentTime / duration) * 100;
          setProgress(currentProgress);
          
          if (currentProgress >= 100) {
            handleNextStory();
          }
        }
      }, updateInterval);

      // Clean up interval
      return () => {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
      };
    }
  }, [activeStory?.video]); // Re-run when video URL changes

  const handleStoryClick = (model: Model) => {
    if (!model.stories?.length) return;
    
    setActiveStory({
      modelId: model.id,
      storyIndex: 0,
      video: model.stories[0],
      stories: model.stories,
      modelName: model.name,
      modelImage: model.main_image
    });
    
    // Ensure body doesn't scroll while stories are open
    document.body.style.overflow = 'hidden';
  };

  const handleCloseStory = () => {
    setActiveStory(null);
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    // Restore body scroll
    document.body.style.overflow = '';
  };

  const handleNextStory = () => {
    if (!activeStory) return;

    const nextIndex = activeStory.storyIndex + 1;
    if (nextIndex < activeStory.stories.length) {
      setActiveStory({
        ...activeStory,
        storyIndex: nextIndex,
        video: activeStory.stories[nextIndex]
      });
    } else {
      // Find next model with stories
      const currentModelIndex = models.findIndex(m => m.id === activeStory.modelId);
      const nextModel = models[currentModelIndex + 1];

      if (nextModel && nextModel.stories && nextModel.stories.length > 0) {
        handleStoryClick(nextModel);
      } else {
        handleCloseStory();
      }
    }
  };

  const handlePrevStory = () => {
    if (!activeStory) return;

    const prevIndex = activeStory.storyIndex - 1;
    if (prevIndex >= 0) {
      setActiveStory({
        ...activeStory,
        storyIndex: prevIndex,
        video: activeStory.stories[prevIndex]
      });
    } else {
      // Find previous model with stories
      const currentModelIndex = models.findIndex(m => m.id === activeStory.modelId);
      const prevModel = models[currentModelIndex - 1];

      if (prevModel && prevModel.stories && prevModel.stories.length > 0) {
        setActiveStory({
          modelId: prevModel.id,
          storyIndex: prevModel.stories.length - 1,
          video: prevModel.stories[prevModel.stories.length - 1],
          stories: prevModel.stories,
          modelName: prevModel.name,
          modelImage: prevModel.main_image
        });
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Swipe threshold of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNextStory();
      } else {
        handlePrevStory();
      }
    }
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex-none w-20 snap-start animate-pulse">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-gray-700 to-gray-600">
                <div className="w-full h-full rounded-full bg-gray-800" />
              </div>
              <div className="mt-2 h-3 w-16 mx-auto bg-gray-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error === 'credentials_missing') {
    return null;
  }

  if (error === 'fetch_error' || !models.length) {
    return null;
  }

  // Group stories by model to avoid duplicates
  const uniqueModels = models.reduce((acc, model) => {
    if (!acc.find(m => m.id === model.id)) {
      acc.push(model);
    }
    return acc;
  }, [] as Model[]);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {uniqueModels.map((model) => (
          <div 
            key={model.id}
            className="flex-none w-20 snap-start"
            onClick={() => handleStoryClick(model)}
          >
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-tr from-[#9F8E6A] to-[#D4C5A9]">
                <div className="w-full h-full rounded-full overflow-hidden bg-black">
                  <img
                    src={model.main_image}
                    alt={model.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {model.stories && model.stories.length > 1 && (
                <div className="absolute -top-1 -right-1 bg-[#9F8E6A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {model.stories.length}
                </div>
              )}
              <p className="text-white text-xs text-center mt-2 truncate">
                {model.name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Story Viewer */}
      {activeStory && (
        <div 
          className="fixed inset-0 z-[70] bg-black flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Progress bars */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
            {activeStory.stories.map((_, index) => (
              <div 
                key={index}
                className="h-0.5 bg-white/20 flex-1 rounded-full overflow-hidden"
              >
                <div 
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ 
                    width: index < activeStory.storyIndex ? '100%' : 
                           index === activeStory.storyIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img
                  src={activeStory.modelImage}
                  alt={activeStory.modelName}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white ml-2">{activeStory.modelName}</span>
              <span className="text-white/50 ml-2">
                {activeStory.storyIndex + 1}/{activeStory.stories.length}
              </span>
            </div>
            <button 
              onClick={handleCloseStory}
              className="ml-auto text-white p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation areas */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1/4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevStory();
            }}
          />
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleNextStory();
            }}
          />

          {/* Video */}
          <video
            ref={videoRef}
            src={activeStory.video}
            className="max-h-screen max-w-full"
            autoPlay
            playsInline
            onEnded={handleNextStory}
          />
        </div>
      )}
    </>
  );
}