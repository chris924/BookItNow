package com.example.bookitnowbackend.service;

import com.example.bookitnowbackend.entity.Company;
import com.example.bookitnowbackend.entity.User;
import com.example.bookitnowbackend.repository.ICompanyRepository;
import com.example.bookitnowbackend.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.nio.file.*;
import java.util.UUID;

@Service
public class AvatarService {

    private final String avatarDirectory;

    @Autowired
    private ICompanyRepository companyRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    public AvatarService(@Value("${avatar.directory.path}") String avatarDirectory) {
        this.avatarDirectory = avatarDirectory;
    }

    public void UpdateAvatar(Integer id, byte[] avatar, String type) {
        try {

            System.out.println("AVATAR DIRECTORY:::::::::::::::::::" + avatarDirectory);

            if (Files.isDirectory(Path.of(avatarDirectory))) {
                try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(Path.of(avatarDirectory))) {
                    // Iterate through the contents of the folder
                    for (Path file : directoryStream) {
                        System.out.println("FILE:" + file.getFileName());
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } else {
                System.out.println("The specified path is not a directory.");
            }



            if(type.equals("user"))
            {
                User optionalUser = userRepository.findById(id).orElse(null);

                if (optionalUser == null) {
                    throw new RuntimeException("User not found!");
                }

                Path directoryPath = Paths.get(avatarDirectory);
                String fileName = UUID.randomUUID().toString() + "_avatar.jpg";
                Path filePath = directoryPath.resolve(fileName);

                Files.write(filePath, avatar, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);


                String avatarUrl = "/uploads/avatars/" + fileName;

                optionalUser.setAvatarUrl(avatarUrl);
                userRepository.save(optionalUser);
            } else if (type.equals("company")) {
                Company optionalCompany = companyRepository.findById(id).orElse(null);

                if (optionalCompany == null) {
                    throw new RuntimeException("Company not found!");
                }

                Path directoryPath = Paths.get(avatarDirectory);
                String fileName = UUID.randomUUID().toString() + "_avatar.jpg";
                Path filePath = directoryPath.resolve(fileName);

                Files.write(filePath, avatar, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);


                String avatarUrl = "/uploads/avatars/" + fileName;

                optionalCompany.setAvatarUrl(avatarUrl);
                companyRepository.save(optionalCompany);
            }


        } catch (Exception e) {
            throw new RuntimeException("Error updating user avatar", e);
        }
    }

}
