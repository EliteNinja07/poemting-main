import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { FLIKI_API_KEY, FLIKI_API_URL } from "../utils/apis";

export const useLanguages = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["FETCH_LANGUAGES"],
    queryFn: async () => {
      const { data } = await axios({
        method: "get",
        url: `${FLIKI_API_URL}/languages`,
        headers: {
          Authentication: `Bearer ${FLIKI_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      return data?.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isLoading,
    error,
    refetch,
  };
};

export const useVoices = ({
  languageId,
  dialectId,
}: {
  languageId: string;
  dialectId: string;
}) => {
  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ["FETCH_VOICES", languageId, dialectId],
    queryFn: async () => {
      const { data } = await axios({
        method: "post",
        url: `${FLIKI_API_URL}/voices`,
        headers: {
          Authentication: `Bearer ${FLIKI_API_KEY}`,
          "Content-Type": "application/json",
        },
        data: {
          languageId,
          dialectId,
        },
      });

      return data ? data.data : null;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error, refetch, isRefetching };
};

export const useDilects = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["FETCH_DILECTS"],
    queryFn: async () => {
      const { data } = await axios({
        method: "get",
        url: `${FLIKI_API_URL}/dialects`,
        headers: {
          Authentication: `Bearer ${FLIKI_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      return data ? data.data : null;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error, refetch };
};

export const useGenerateVoice = ({
  content,
  voiceId,
  voiceStyleId = null,
  enabled,
}: {
  content: string;
  voiceId: string;
  voiceStyleId: string | null;
  enabled: boolean;
}) => {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["FETCH_VOICES", voiceId, voiceStyleId, content],
    queryFn: async () => {
      const res = await axios({
        method: "post",
        url: `${FLIKI_API_URL}/generate/audio`,
        headers: {
          Authentication: `Bearer ${FLIKI_API_KEY}`,
          "Content-Type": "application/json",
        },
        data: {
          content,
          voiceId,
          voiceStyleId,
        },
      });

      return res?.data ? res?.data : null;
    },
    enabled,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, error, refetch, isFetching };
};

export const useGenerateVideo = () => {
  const { mutateAsync, data, isLoading, error }: any = useMutation(
    async ({
      imageFile,
      imageLink,
      audioLink,
      backgroundMusicFile,
    }: {
      imageFile?: File;
      backgroundMusicFile?: File;
      imageLink?: string;
      audioLink: string;
    }) => {
      let headersList = {
        Accept: "/",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };

      let formdata = new FormData();

      if (imageFile) {
        formdata.append("image", imageFile);
        formdata.append("audioLink", audioLink);
      }

      if (!imageFile && backgroundMusicFile && imageLink) {
        formdata.append("imageLink", imageLink);
        formdata.append("audioLink", audioLink);
      }

      if (backgroundMusicFile) {
        formdata.append("audio", backgroundMusicFile);
      }

      let reqOptions = {
        // @ts-ignore
        url: `${import.meta.env.VITE_API_URL}/v2/videos`,
        method: "POST",
        headers: headersList,
        data:
          imageFile || backgroundMusicFile
            ? formdata
            : {
                imageLink,
                audioLink,
              },
      };

      const { data } = await axios.request(reqOptions);

      return data;
    }
  );
  return {
    data,
    mutateAsync,
    error,
    isLoading,
  };
};
