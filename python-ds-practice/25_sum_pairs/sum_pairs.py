def sum_pairs(nums, goal):
    """Return tuple of first pair of nums that sum to goal.

    For example:

        >>> sum_pairs([1, 2, 2, 10], 4)
        (2, 2)

    (4, 2) sum to 6, and come before (5, 1):

        >>> sum_pairs([4, 2, 10, 5, 1], 6) # (4, 2)
        (4, 2)

    (4, 3) sum to 7, and finish before (5, 2):

        >>> sum_pairs([5, 1, 4, 8, 3, 2], 7)
        (4, 3)

    No pairs sum to 100, so return empty tuple:

        >>> sum_pairs([11, 20, 4, 2, 1, 5], 100)
        ()
    """
    add_pair = None
    distance = len(nums)
    for num in nums:
        for i in nums[nums.index(num) + 1 : len(nums) - 1 : 1]:
            if num + i == goal and (nums.index(num) - nums.index(i)) < distance:
                distance = nums.index(num) - nums.index(i)
                add_pair = (num, i)
    if add_pair:
        return add_pair
    else:
        return tuple()
    
    
    
    
    # currentIndex = 0
    # while currentIndex < len(nums):
    #     distance = 0
    #     for num in nums: 
    #         distance += 1
    #         if (num + nums[currentIndex + distance]) == goal:
    #             return (num, nums[nums.index(num) + distance])
    #         else:
    #             currentIndex += 1

    # currentIndex = 0
    # while currentIndex < len(nums):
    #     for num in nums:
    #         distance = 1
    #         while distance < len(nums) - currentIndex:
    #             if (num + nums[currentIndex + distance]) == goal:
    #                 return (num, nums[nums.index(num) + distance])
    #         else:
    #             currentIndex += 1
    #             distance += 1
    

        
        
        
# while (len(nums) - nums.index(num) - 1) > distance:

        # count = 0
        # remaining = nums[nums.index(num) + 1 : len(nums)-1 : 1]
        # while count < ((len(nums) - 1) - (len(remaining) - 1)):
        #     count += 1
        #     if num + nums[nums.index(num) + count] == goal:
        #         return (num, nums[nums.index(num) + count])
    
