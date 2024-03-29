import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyQuizTabs from "../../../components/dashboard/teacher/MyQuizTabs";
import MyQuizzes from "../../../components/dashboard/teacher/MyQuizzes";
import { CreateQuizButton } from "../../../components/designer/CreateQuizButton";
import IconTeacher from "../../../components/ui/icons/IconTeacher";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import { generateGetAllQuizzesQuery } from "../../../components/util/generateGetAllQuestionsQuery";
import {
  useAddResultsMutation,
  useGetAllQuizzesQuery,
} from "../../../redux/apis/strapi";
import { selectUI, updateUIState } from "../../../redux/slices/uiSlice";

function Index(props) {
  const { myQuizzesSearch, myQuizzesCurrentPage, myQuizzesSearchQuery } =
    useSelector(selectUI);
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [query, setQuery] = useState(
    generateGetAllQuizzesQuery(myQuizzesSearch, myQuizzesCurrentPage)
  );

  const {
    data: quizList,
    error,
    isLoading,
  } = useGetAllQuizzesQuery(
    { query: myQuizzesSearchQuery },
    { skip: !session }
  );
  const [addResultsStrapi, addResultStrapiStatus] = useAddResultsMutation();

  useEffect(() => {
    const query = generateGetAllQuizzesQuery(
      myQuizzesSearch,
      myQuizzesCurrentPage
    );
    dispatch(updateUIState({ myQuizzesSearchQuery: query }));
    setQuery(query);
  }, [myQuizzesSearch, myQuizzesCurrentPage]);

  return (
    <div className={"h-[80vh] px-6"}>
      <div className="md:flex md:items-center md:justify-between mt-2 ">
        <div className="min-w-0 flex items-center justify-center gap-3">
          <div className={"p-4 bg-blue-50 rounded-full"}>
            <div className={" fill-blue-500 flex items-center justify-center"}>
              <div className={"w-10 h-10"}>
                <IconTeacher />
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            My Classroom
          </h2>
        </div>
        <div className={"flex items-center gap-2"}>
          <div className="relative w-full max-w-xs">
            <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center pl-2">
              <MagnifyingGlassIcon className="h-6 w-6 text-gray-300 stroke-2" />
            </div>
            <input
              autoComplete={"off"}
              id="search"
              name="search"
              value={myQuizzesSearch}
              onChange={(e) => {
                dispatch(updateUIState({ myQuizzesSearch: e.target.value }));
              }}
              className="pl-12  placeholder-gray-300 w-full rounded-xl border-gray-200 hover:border-gray-200 py-3 pr-3  focus:border focus:border-blue-500 focus:placeholder-gray-400 focus:outline-none  focus:ring-blue-500"
              placeholder="Search for quiz"
              type="search"
            />
          </div>
          <CreateQuizButton />
        </div>
      </div>
      <div className={"  mt-2"}>
        <div className={` rounded-lg text-gray-400 font-semibold `}>
          <MyQuizTabs>
            {isLoading ? <LoadingSpinner /> : <MyQuizzes />}
          </MyQuizTabs>
        </div>
      </div>
    </div>
  );
}

export default Index;
