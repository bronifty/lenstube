import IsVerified from '@components/Common/IsVerified'
import { NextLink } from '@components/UIElements/DropMenu'
import { Menu } from '@headlessui/react'
import getProfilePicture from '@utils/functions/getProfilePicture'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { FC } from 'react'
import { NewCommentNotification } from 'src/types'

dayjs.extend(relativeTime)

interface Props {
  notification: NewCommentNotification
}

const CommentedNotification: FC<Props> = ({ notification }) => {
  return (
    <>
      <div className="flex items-center space-x-3">
        <Menu.Item
          as={NextLink}
          href={`/${notification?.profile?.handle}`}
          className="inline-flex items-center space-x-1.5 font-base"
        >
          <img
            className="w-4 h-4 rounded"
            src={getProfilePicture(notification.profile, 'avatar')}
            alt="channel picture"
            draggable={false}
          />
          <div className="flex items-center space-x-0.5">
            <span>{notification?.profile?.handle}</span>
            <IsVerified id={notification?.profile?.id} size="xs" />
          </div>
        </Menu.Item>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600 truncate dark:text-gray-400">
          commented on your
          <Menu.Item
            as={NextLink}
            href={`/watch/${
              notification?.comment?.commentOn &&
              notification?.comment?.commentOn?.id
            }`}
            className="ml-1 text-indigo-500"
          >
            video
          </Menu.Item>
        </span>
        <div className="flex items-center flex-none space-x-1 text-xs text-gray-400">
          <span>{dayjs(new Date(notification?.createdAt)).fromNow()}</span>
        </div>
      </div>
    </>
  )
}

export default CommentedNotification
