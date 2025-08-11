<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;


class UserController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository
    ) {
    }

    #[Route('/api/auth/signup', name: 'api_register', methods: ['POST'])]
    public function signup(
        Request $request,
        UserPasswordHasherInterface $passwordHasher
    ) {
        try {
            $data = json_decode($request->getContent(), true);
            $user = new User();

            $hashedPassword = $passwordHasher->hashPassword($user, $data['password']);

            $user->setPassword($hashedPassword);
            $user->setEmail($data['email']);
            $user->setFullName($data['fullName'] ?? '');
            $this->userRepository->save($user);
            return $this->json([
                'message' => 'User created'
            ]);
        } catch (\Exception $e) {
        }

        return $this->json([
            'message' => 'Error'
        ], Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    #[Route('/api/auth/login', name: 'api_login', methods: ['POST', 'GET'])]
    public function login(Request $request, UserPasswordHasherInterface $passwordHasher): Response
    {
        try {
            $data = json_decode($request->getContent(), true);
            if (empty($data['email'])) {
                throw new \Exception('Column \'email\' is required');
            }

            $user = $this->userRepository->getByEmail($data['email']);

            if (!$user) {
                throw new \Exception('User not found');
            }

            $isPasswordValid = $passwordHasher->isPasswordValid($user, $data['password']);
            if (!$isPasswordValid) {
                throw new \Exception('Invalid password');
            }

            $token = User::generateToken();
            $user->setToken($token);
            $this->userRepository->save($user);

            $response = $this->json([
                'token' => $token,
                'user' => [
                    'id' => $user->getId(),
                    'full_name' => $user->getFullName(),
                    'email' => $user->getEmail(),
                    'is_admin' => $user->isAdmin()
                ]
            ]);

            // Add CORS headers to the response
            $response->headers->set('Access-Control-Allow-Origin', '*'); // Replace * with your frontend domain in production
            $response->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

            return $response;
        } catch (\Exception $e) {
            $errorResponse = $this->json([
                'message' => $e->getMessage()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);

            // Make sure to include CORS headers
            $errorResponse->headers->set('Access-Control-Allow-Origin', '*'); // Replace with your frontend origin in production
            $errorResponse->headers->set('Access-Control-Allow-Methods', 'POST, OPTIONS');
            $errorResponse->headers->set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

            return $errorResponse;
        }
    }


    #[Route('/api/user', name: 'api_user', methods: ['GET'])]
    public function getUserInfo(Security $security): Response
    {
        $user = $security->getUser();

        if (!$user) {
            return new Response('Unauthorized', Response::HTTP_UNAUTHORIZED);
        }

        return $this->json([
            'id' => $user->getId(),
            'email' => $user->getEmail(),
        ]);
    }
}
